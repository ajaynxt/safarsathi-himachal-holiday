import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { requireWorkspaceAccess } from '../middleware/tenantIsolation';
import { ConnectorController } from '../controllers/connectorController';

const router = Router();

// Public/authenticated: List all 17 connectors and health status
router.get('/', authenticateToken, ConnectorController.listConnectors);

// Tenant-scoped: List connected channels for active workspace
router.get(
  '/workspace',
  authenticateToken,
  requireWorkspaceAccess(['workspace_owner', 'workspace_admin', 'workspace_member']),
  ConnectorController.getWorkspaceChannels
);

// Tenant-scoped: Start OAuth flow (Owner or Admin only)
router.post(
  '/:platformId/oauth/start',
  authenticateToken,
  requireWorkspaceAccess(['workspace_owner', 'workspace_admin']),
  ConnectorController.startOAuth
);

// Tenant-scoped: Complete OAuth callback
router.post(
  '/:platformId/oauth/callback',
  authenticateToken,
  ConnectorController.handleCallback
);

// Tenant-scoped: Direct Connect channel (e.g. facebook, instagram, youtube, etc.)
router.post(
  '/:platformId/direct-connect',
  authenticateToken,
  ConnectorController.directConnectChannel
);

// Tenant-scoped: Facebook/Platform ID & Password Login Connect
router.post(
  '/facebook/login-connect',
  authenticateToken,
  ConnectorController.facebookLoginConnect
);

// Tenant-scoped: Disconnect channel (Owner or Admin only)
router.post(
  '/:channelId/disconnect',
  authenticateToken,
  requireWorkspaceAccess(['workspace_owner', 'workspace_admin']),
  ConnectorController.disconnectChannel
);

// Tenant-scoped: Fetch individual platform analytics report
router.get(
  '/:platformId/analytics',
  authenticateToken,
  requireWorkspaceAccess(['workspace_owner', 'workspace_admin', 'workspace_member']),
  ConnectorController.getPlatformAnalytics
);

export default router;
