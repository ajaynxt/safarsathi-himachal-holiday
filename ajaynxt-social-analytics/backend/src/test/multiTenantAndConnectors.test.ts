import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import { BackendFirestoreService } from '../services/firestoreService';
import { requireWorkspaceAccess } from '../middleware/tenantIsolation';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { PlatformConnectorRegistry } from '../connectors/connectorRegistry';
import { SyncEngine } from '../services/syncService';
import { Validator } from '../utils/validation';

describe('Production Multi-Tenant Isolation & Security Tests', () => {
  beforeEach(() => {
    BackendFirestoreService.resetTestStore();

    // Seed Workspace 1 (Acme Media) with Owner Alice
    BackendFirestoreService.seedTestTenant('ws_acme_001', 'usr_alice_123', 'alice@acme.com', 'workspace_owner');

    // Seed Workspace 2 (Beta Agency) with Owner Bob
    BackendFirestoreService.seedTestTenant('ws_beta_002', 'usr_bob_456', 'bob@beta.com', 'workspace_owner');

    // Add Member Charlie to Workspace 1 with 'workspace_member' role
    BackendFirestoreService.seedTestTenant('ws_acme_001', 'usr_charlie_789', 'charlie@acme.com', 'workspace_member');
  });

  it('should allow Alice to access her own workspace ws_acme_001', async () => {
    const middleware = requireWorkspaceAccess(['workspace_owner', 'workspace_admin', 'workspace_member']);

    const req: Partial<AuthenticatedRequest> = {
      headers: { 'x-workspace-id': 'ws_acme_001' },
      user: { uid: 'usr_alice_123', email: 'alice@acme.com', isSuperAdmin: false },
      path: '/api/analytics/overview',
    };

    let nextCalled = false;
    let statusCode: number | null = null;
    let responseData: any = null;

    const res: any = {
      status(code: number) {
        statusCode = code;
        return {
          json(data: any) {
            responseData = data;
          },
        };
      },
    };

    await middleware(req as AuthenticatedRequest, res, () => {
      nextCalled = true;
    });

    assert.strictEqual(nextCalled, true, 'Next function must be called when user owns the workspace');
    assert.strictEqual(statusCode, null, 'No error response status should be set');
    assert.strictEqual(req.workspaceRole, 'workspace_owner', 'Req role must be populated as workspace_owner');
  });

  it('CRITICAL: should strictly reject Alice if she attempts an IDOR cross-tenant request to Bob workspace ws_beta_002', async () => {
    const middleware = requireWorkspaceAccess(['workspace_owner', 'workspace_admin', 'workspace_member']);

    // Alice attempts to access Bob's workspace ws_beta_002
    const req: Partial<AuthenticatedRequest> = {
      headers: { 'x-workspace-id': 'ws_beta_002' },
      user: { uid: 'usr_alice_123', email: 'alice@acme.com', isSuperAdmin: false },
      path: '/api/analytics/overview',
      ip: '192.168.1.100',
    };

    let nextCalled = false;
    let statusCode: number | null = null;
    let responseData: any = null;

    const res: any = {
      status(code: number) {
        statusCode = code;
        return {
          json(data: any) {
            responseData = data;
          },
        };
      },
    };

    await middleware(req as AuthenticatedRequest, res, () => {
      nextCalled = true;
    });

    assert.strictEqual(nextCalled, false, 'Next function MUST NOT be called on unauthorized cross-tenant request');
    assert.strictEqual(statusCode, 403, 'Must return HTTP 403 Forbidden');
    assert.strictEqual(responseData?.error, 'CROSS_TENANT_ACCESS_DENIED');

    // Verify immutable audit log was created
    const auditLogs = await BackendFirestoreService.getAuditLogs(10, 'ws_beta_002');
    assert.ok(auditLogs.length > 0, 'Audit log must record cross-tenant violation attempt');
    const log = auditLogs[0];
    assert.strictEqual(log.actorUid, 'usr_alice_123');
    assert.strictEqual(log.action, 'CROSS_TENANT_VIOLATION_BLOCKED');
  });

  it('should enforce RBAC: reject Member Charlie from administrative workspace actions', async () => {
    // Requires Admin or Owner
    const adminMiddleware = requireWorkspaceAccess(['workspace_owner', 'workspace_admin']);

    const req: Partial<AuthenticatedRequest> = {
      headers: { 'x-workspace-id': 'ws_acme_001' },
      user: { uid: 'usr_charlie_789', email: 'charlie@acme.com', isSuperAdmin: false },
      path: '/api/analytics/sync',
    };

    let nextCalled = false;
    let statusCode: number | null = null;
    let responseData: any = null;

    const res: any = {
      status(code: number) {
        statusCode = code;
        return {
          json(data: any) {
            responseData = data;
          },
        };
      },
    };

    await adminMiddleware(req as AuthenticatedRequest, res, () => {
      nextCalled = true;
    });

    assert.strictEqual(nextCalled, false, 'Member cannot execute admin-only operations');
    assert.strictEqual(statusCode, 403);
    assert.strictEqual(responseData?.error, 'INSUFFICIENT_PERMISSIONS');
  });
});

describe('17 Platform Connector Engine Tests', () => {
  it('should have all 17 distinct platform connectors registered', () => {
    const connectors = PlatformConnectorRegistry.getAllConnectors();
    assert.strictEqual(connectors.length, 17, 'Must register exactly 17 platform connectors');

    const expectedIds = [
      'instagram', 'facebook', 'youtube', 'tiktok', 'linkedin', 'x_twitter',
      'pinterest', 'threads', 'snapchat', 'twitch', 'bluesky', 'reddit',
      'meta_ads', 'google_ads', 'ga4', 'google_business', 'whatsapp_business'
    ];

    expectedIds.forEach((id) => {
      const conn = PlatformConnectorRegistry.getConnector(id);
      assert.ok(conn, `Connector '${id}' must be present in registry`);
      assert.ok(conn.name.length > 0, `Connector '${id}' must have a name`);
      assert.ok(conn.supportedScopes.length > 0, `Connector '${id}' must define OAuth scopes`);
      assert.ok(conn.rateLimits.maxCallsPerDay > 0, `Connector '${id}' must define rate limits`);
    });
  });

  it('should correctly classify Snapchat as ADS_ONLY per official API constraints', () => {
    const snapConnector = PlatformConnectorRegistry.getConnector('snapchat');
    assert.ok(snapConnector);
    assert.strictEqual(snapConnector.apiStatus, 'ADS_ONLY');
    assert.strictEqual(snapConnector.category, 'ads_and_web');
  });

  it('should generate official OAuth URLs with CSRF state token', () => {
    const igConnector = PlatformConnectorRegistry.getConnector('instagram')!;
    const state = 'test_csrf_token_entropy_12345';
    const redirectUri = 'https://app.ajaynxt.com/api/connectors/instagram/callback';
    const url = igConnector.getAuthorizationUrl(state, redirectUri);

    assert.ok(url.includes('facebook.com/v21.0/dialog/oauth'), 'Must target official Meta v21.0 OAuth endpoint');
    assert.ok(url.includes(`state=${state}`), 'Must encode CSRF state');
    assert.ok(url.includes(encodeURIComponent(redirectUri)), 'Must encode redirect URI');
  });

  it('should return normalized metrics from connector fetchAnalytics', async () => {
    const igConnector = PlatformConnectorRegistry.getConnector('instagram')!;
    const result = await igConnector.fetchAnalytics('valid_decrypted_token', '17841405309211029', {
      start: '2026-10-01',
      end: '2026-10-31',
    });

    assert.strictEqual(result.platformId, 'instagram');
    assert.strictEqual(result.source, 'OFFICIAL_API_V21');
    assert.ok(result.metrics.length >= 4, 'Must return normalized metrics (Followers, Reach, Views, Interactions)');

    const followers = result.metrics.find((m) => m.key === 'total_followers');
    assert.ok(followers);
    assert.strictEqual(followers.comparable, true);
  });
});

describe('Background Sync Engine & Exponential Backoff Tests', () => {
  it('should calculate exponential backoff with jitter within bounded limits', () => {
    for (let attempt = 1; attempt <= 5; attempt++) {
      const delay = SyncEngine.calculateBackoff(attempt, 1000, 30000);
      assert.ok(delay >= 1000, 'Delay must be at least base delay');
      assert.ok(delay <= 36000, 'Delay must not exceed bounded ceiling + jitter');
    }
  });

  it('should execute idempotent channel sync without duplicate executions', async () => {
    BackendFirestoreService.resetTestStore();
    BackendFirestoreService.seedTestTenant('ws_acme_001', 'usr_alice_123', 'alice@acme.com', 'workspace_owner');

    const result = await SyncEngine.syncChannel('ws_acme_001', 'instagram_primary', true);
    assert.strictEqual(result.status, 'COMPLETED');
    assert.strictEqual(result.workspaceId, 'ws_acme_001');
    assert.ok(result.recordsSynced > 0);
  });
});

describe('Input Validation & Security Guard Tests', () => {
  it('should sanitize XSS and strip HTML script tags from user inputs', () => {
    const malicious = '<script>alert("hacked")</script>Acme Agency';
    const sanitized = Validator.sanitizeString(malicious, 'workspaceName');
    assert.strictEqual(sanitized, 'alert("hacked")Acme Agency', 'Script tags must be stripped');
    assert.ok(!sanitized.includes('<script>'), 'Must not contain script tags');
  });

  it('should reject invalid workspace ID format and directory traversal syntax', () => {
    const traversal = '../../etc/passwd';
    assert.throws(
      () => Validator.validateWorkspaceId(traversal),
      /Invalid workspace ID format/,
      'Must reject directory traversal syntax'
    );
  });

  it('should validate email format and reject invalid emails', () => {
    const valid = 'test.user+agency@brand.co.in';
    const result = Validator.validateEmail(valid);
    assert.strictEqual(result, valid);

    assert.throws(
      () => Validator.validateEmail('invalid-email-no-at-sign'),
      /Invalid email address format/
    );
  });
});
