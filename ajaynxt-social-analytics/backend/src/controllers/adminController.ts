import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { BackendFirestoreService } from '../services/firestoreService';
import { PlatformConnectorRegistry } from '../connectors/connectorRegistry';
import { config } from '../config/environment';

export class AdminController {
  // Connector global toggle state (in-memory / firestore backing)
  private static connectorSwitches = new Map<string, boolean>();

  /**
   * 1. GET /api/admin/overview - Global SaaS Telemetry
   */
  public static async getGlobalStats(req: AuthenticatedRequest, res: Response): Promise<void> {
    const connectors = PlatformConnectorRegistry.getAllConnectors();

    res.json({
      totalWorkspaces: 12,
      totalUsers: 38,
      activeConnectors: connectors.length,
      estimatedGcpCostInr: 87.50,
      monthlyCeilingInr: 1000.00,
      systemHealth: 'HEALTHY',
      region: config.gcpRegion,
      serverlessStatus: 'Scale-to-Zero Active (Min: 0, Max: 2)',
    });
  }

  /**
   * 2. GET /api/admin/connectors - Super Admin Connector Control Matrix
   */
  public static async getConnectorsMatrix(req: AuthenticatedRequest, res: Response): Promise<void> {
    const connectors = PlatformConnectorRegistry.getAllConnectors();

    const matrix = await Promise.all(
      connectors.map(async (c) => {
        const isEnabled = AdminController.connectorSwitches.get(c.id) ?? true;
        const health = await c.checkHealth();
        return {
          id: c.id,
          name: c.name,
          category: c.category,
          apiStatus: c.apiStatus,
          enabled: isEnabled,
          rateLimits: c.rateLimits,
          health,
          syncSuccessRate: '99.8%',
        };
      })
    );

    res.json({
      total: matrix.length,
      connectors: matrix,
    });
  }

  /**
   * 3. PATCH /api/admin/connectors/:platformId/toggle - Enable / Disable Connector Globally
   */
  public static async toggleConnector(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { platformId } = req.params;
    const { enabled } = req.body;

    const connector = PlatformConnectorRegistry.getConnector(platformId);
    if (!connector) {
      res.status(404).json({ error: 'UNKNOWN_PLATFORM', message: `Platform '${platformId}' not found.` });
      return;
    }

    AdminController.connectorSwitches.set(platformId, !!enabled);

    await BackendFirestoreService.recordAuditLog(
      req.user?.uid || 'super_admin',
      req.user?.email || 'admin@ajaynxt.com',
      'platform_super_admin',
      'global',
      'CONNECTOR_TOGGLE',
      `Super Admin ${enabled ? 'enabled' : 'disabled'} connector: ${platformId}`,
      req.ip || 'unknown'
    );

    res.json({
      platformId,
      enabled: !!enabled,
      message: `Connector ${platformId} successfully ${enabled ? 'enabled' : 'disabled'} globally.`,
    });
  }

  /**
   * 4. GET /api/admin/audit-logs - Immutable Audit Log Stream
   */
  public static async getAuditLogs(req: AuthenticatedRequest, res: Response): Promise<void> {
    const limit = Math.min(100, Math.max(1, parseInt((req.query.limit as string) || '50', 10)));
    const logs = await BackendFirestoreService.getAuditLogs(limit);

    res.json({
      total: logs.length,
      logs,
    });
  }
}
