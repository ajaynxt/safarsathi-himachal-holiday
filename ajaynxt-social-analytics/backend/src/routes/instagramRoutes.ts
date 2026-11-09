import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { requireWorkspaceAccess } from '../middleware/tenantIsolation';
import { InstagramController } from '../controllers/instagramController';

const router = Router();

// 1. OAuth start endpoint: initiates Meta dialog & returns CSRF state
router.get(
  '/connect',
  authenticateToken,
  requireWorkspaceAccess(['workspace_owner', 'workspace_admin']),
  InstagramController.initiateOAuth
);

// 2. OAuth callback endpoint: exchanges code for token, encrypts with AES-256-GCM, saves connection
router.post(
  '/callback',
  authenticateToken,
  requireWorkspaceAccess(['workspace_owner', 'workspace_admin']),
  InstagramController.handleCallback
);

// 2b. Direct Account Connect endpoint: connects real Instagram handle
router.post(
  '/connect-account',
  authenticateToken,
  InstagramController.directConnectAccount
);

// 3. Token refresh endpoint: handles 60-day token extension
router.post(
  '/refresh',
  authenticateToken,
  requireWorkspaceAccess(['workspace_owner', 'workspace_admin']),
  InstagramController.refreshToken
);

// 4. Account disconnection endpoint
router.post(
  '/disconnect',
  authenticateToken,
  requireWorkspaceAccess(['workspace_owner', 'workspace_admin']),
  InstagramController.disconnectAccount
);

// 5. Meta deauthorization webhook callback
router.post('/deauth', InstagramController.handleDeauthorization);

// 6. Meta GDPR user data deletion webhook callback
router.post('/data-deletion', InstagramController.handleDataDeletion);

export default router;
