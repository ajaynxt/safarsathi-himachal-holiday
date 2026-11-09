import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { requireWorkspaceAccess } from '../middleware/tenantIsolation';
import { AnalyticsController } from '../controllers/analyticsController';

const router = Router();

// Unified multi-platform marketing overview
router.get(
  '/unified',
  authenticateToken,
  requireWorkspaceAccess(['workspace_owner', 'workspace_admin', 'workspace_member']),
  AnalyticsController.getUnifiedOverview
);

// Instagram Evolution (Metricool Clone)
router.get(
  '/instagram/evolution',
  authenticateToken,
  requireWorkspaceAccess(['workspace_owner', 'workspace_admin', 'workspace_member']),
  AnalyticsController.getInstagramEvolution
);

// Meta Ads Performance
router.get(
  '/meta-ads',
  authenticateToken,
  requireWorkspaceAccess(['workspace_owner', 'workspace_admin', 'workspace_member']),
  AnalyticsController.getMetaAds
);

// Google Analytics 4 Telemetry
router.get(
  '/ga4',
  authenticateToken,
  requireWorkspaceAccess(['workspace_owner', 'workspace_admin', 'workspace_member']),
  AnalyticsController.getGA4
);

// Manual Sync Trigger (Owner or Admin only)
router.post(
  '/sync',
  authenticateToken,
  requireWorkspaceAccess(['workspace_owner', 'workspace_admin']),
  AnalyticsController.triggerSync
);

export default router;
