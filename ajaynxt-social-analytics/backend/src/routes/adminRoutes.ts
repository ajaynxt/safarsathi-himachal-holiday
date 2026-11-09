import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { AdminController } from '../controllers/adminController';

const router = Router();

// Middleware to enforce Platform Super Admin privilege (Strictly for ajayx3neha@gmail.com)
const requireSuperAdmin = (req: any, res: any, next: any) => {
  const isAuthorized = req.user && (req.user.email?.toLowerCase() === 'ajayx3neha@gmail.com' || (req.user.isSuperAdmin && process.env.NODE_ENV !== 'production'));
  if (!isAuthorized) {
    res.status(403).json({
      error: 'SUPER_ADMIN_REQUIRED',
      message: 'Access denied: Platform Super Admin portal is strictly restricted to ajayx3neha@gmail.com.',
    });
    return;
  }
  next();
};

// Global SaaS Telemetry
router.get('/overview', authenticateToken, requireSuperAdmin, AdminController.getGlobalStats);

// 17 Platform Connector Management Matrix
router.get('/connectors', authenticateToken, requireSuperAdmin, AdminController.getConnectorsMatrix);

// Toggle Connector On/Off Globally
router.patch('/connectors/:platformId/toggle', authenticateToken, requireSuperAdmin, AdminController.toggleConnector);

// Immutable System Audit Logs
router.get('/audit-logs', authenticateToken, requireSuperAdmin, AdminController.getAuditLogs);

export default router;
