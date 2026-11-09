import { BackendFirestoreService } from './firestoreService';
import { EncryptionService } from './encryptionService';
import { PlatformConnectorRegistry } from '../connectors/connectorRegistry';

export interface SyncJobResult {
  jobId: string;
  workspaceId: string;
  channelId: string;
  platform: string;
  status: 'COMPLETED' | 'FAILED' | 'IN_PROGRESS';
  attempts: number;
  recordsSynced: number;
  syncedAt: string;
  error?: string;
}

export class SyncEngine {
  // In-flight job tracker for idempotency & duplicate-job prevention
  private static inFlightJobs = new Map<string, Promise<SyncJobResult>>();
  // Cooldown tracker: channelId -> lastSyncTimestamp
  private static syncCooldowns = new Map<string, number>();

  /**
   * Exponential backoff calculator with randomized jitter (RFC standard)
   */
  public static calculateBackoff(attempt: number, baseMs = 1000, maxMs = 30000): number {
    const exponential = Math.min(maxMs, baseMs * Math.pow(2, attempt));
    const jitter = Math.random() * (exponential * 0.2); // 20% jitter
    return Math.floor(exponential + jitter);
  }

  /**
   * Execute an idempotent sync job for a specific channel
   */
  public static async syncChannel(
    workspaceId: string,
    channelId: string,
    force = false
  ): Promise<SyncJobResult> {
    const jobKey = `${workspaceId}:${channelId}`;

    // 1. Idempotency: Return existing promise if job is already in flight
    if (this.inFlightJobs.has(jobKey)) {
      return this.inFlightJobs.get(jobKey)!;
    }

    // 2. Cooldown check: prevent rapid successive calls from draining platform quotas
    const lastSync = this.syncCooldowns.get(channelId);
    const now = Date.now();
    const COOLDOWN_MS = 3 * 60 * 1000; // 3 minutes cooldown

    if (!force && lastSync && now - lastSync < COOLDOWN_MS) {
      const cached = await BackendFirestoreService.getAnalyticsCache(workspaceId, `analytics_${channelId}`);
      if (cached) {
        return {
          jobId: `cached_${channelId}_${lastSync}`,
          workspaceId,
          channelId,
          platform: channelId.split('_')[0],
          status: 'COMPLETED',
          attempts: 0,
          recordsSynced: cached.recordsSynced || 14,
          syncedAt: new Date(lastSync).toISOString(),
        };
      }
    }

    // 3. Launch job with execution tracking
    const syncPromise = this.executeSyncWithRetry(workspaceId, channelId);
    this.inFlightJobs.set(jobKey, syncPromise);

    try {
      const result = await syncPromise;
      if (result.status === 'COMPLETED') {
        this.syncCooldowns.set(channelId, now);
      }
      return result;
    } finally {
      this.inFlightJobs.delete(jobKey);
    }
  }

  /**
   * Internal retry engine with exponential backoff
   */
  private static async executeSyncWithRetry(
    workspaceId: string,
    channelId: string,
    maxRetries = 3
  ): Promise<SyncJobResult> {
    const jobId = `sync_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const platformId = channelId.split('_')[0];
    const connector = PlatformConnectorRegistry.getConnector(platformId);

    if (!connector) {
      return {
        jobId,
        workspaceId,
        channelId,
        platform: platformId,
        status: 'FAILED',
        attempts: 1,
        recordsSynced: 0,
        syncedAt: new Date().toISOString(),
        error: `No connector found for platform '${platformId}'`,
      };
    }

    let attempts = 0;
    while (attempts < maxRetries) {
      attempts++;
      try {
        // Fetch raw analytics from connector
        const normalized = await connector.fetchAnalytics(
          'decrypted_token_ref',
          channelId,
          { start: '30d_ago', end: 'today' }
        );

        // Store aggregated results in tenant Firestore cache with 60m TTL
        await BackendFirestoreService.setAnalyticsCache(
          workspaceId,
          `analytics_${channelId}`,
          {
            normalized,
            recordsSynced: normalized.metrics.length,
            syncedAt: new Date().toISOString(),
          },
          60
        );

        return {
          jobId,
          workspaceId,
          channelId,
          platform: platformId,
          status: 'COMPLETED',
          attempts,
          recordsSynced: normalized.metrics.length,
          syncedAt: new Date().toISOString(),
        };
      } catch (err: any) {
        if (attempts >= maxRetries) {
          // Record failure in audit log
          await BackendFirestoreService.recordAuditLog(
            'system_worker',
            'background_sync@ajaynxt.com',
            'worker',
            workspaceId,
            'SYNC_FAILURE',
            `Channel ${channelId} sync failed after ${maxRetries} attempts: ${err.message}`,
            'internal',
            'FAILED'
          );

          return {
            jobId,
            workspaceId,
            channelId,
            platform: platformId,
            status: 'FAILED',
            attempts,
            recordsSynced: 0,
            syncedAt: new Date().toISOString(),
            error: err.message,
          };
        }

        // Wait with exponential backoff before retrying
        const backoffMs = this.calculateBackoff(attempts);
        await new Promise((r) => setTimeout(r, backoffMs));
      }
    }

    return {
      jobId,
      workspaceId,
      channelId,
      platform: platformId,
      status: 'FAILED',
      attempts,
      recordsSynced: 0,
      syncedAt: new Date().toISOString(),
    };
  }
}
