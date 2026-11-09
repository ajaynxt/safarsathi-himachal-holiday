import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authMiddleware';
import { BackendFirestoreService } from '../services/firestoreService';
import { Validator } from '../utils/validation';

export const requireWorkspaceAccess = (allowedRoles: string[] = []) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    // 1. Extract workspace ID from header or path param
    const rawWorkspaceId =
      (req.headers['x-workspace-id'] as string) ||
      req.params.workspaceId ||
      req.body?.workspaceId;

    if (!rawWorkspaceId) {
      res.status(400).json({
        error: 'MISSING_WORKSPACE_ID',
        message: 'A valid workspace ID must be provided in the x-workspace-id header or path parameters.',
      });
      return;
    }

    let workspaceId: string;
    try {
      workspaceId = Validator.validateWorkspaceId(rawWorkspaceId);
    } catch (err: any) {
      res.status(400).json({
        error: 'INVALID_WORKSPACE_ID_FORMAT',
        message: err.message,
      });
      return;
    }

    // 2. Validate authentication context
    if (!req.user || !req.user.uid) {
      res.status(401).json({
        error: 'UNAUTHORIZED',
        message: 'User authentication required prior to tenant authorization.',
      });
      return;
    }

    req.workspaceId = workspaceId;

    // 3. Platform Super Admin oversight for global admin telemetry routes
    if (req.user.isSuperAdmin && req.path.startsWith('/admin')) {
      req.workspaceRole = 'platform_super_admin';
      next();
      return;
    }

    try {
      // 4. Query Firestore membership directly at: workspaces/{workspaceId}/members/{uid}
      const verification = await BackendFirestoreService.verifyTenantMembership(
        req.user.uid,
        workspaceId
      );

      // 5. Anti-IDOR & Cross-Tenant Leakage Check
      if (!verification.isMember) {
        // Record immutable audit entry
        await BackendFirestoreService.recordAuditLog(
          req.user.uid,
          req.user.email || 'unknown',
          'unauthorized',
          workspaceId,
          'CROSS_TENANT_VIOLATION_BLOCKED',
          `Unauthorized access attempt to tenant workspace: ${workspaceId} from IP: ${req.ip || 'unknown'}`,
          req.ip || 'unknown',
          'WARNING'
        );

        res.status(403).json({
          error: 'CROSS_TENANT_ACCESS_DENIED',
          message: 'Access denied: You are not an authorized member of this workspace.',
        });
        return;
      }

      // 6. Role-Based Access Control (RBAC) Check
      const role = verification.role || 'workspace_member';
      req.workspaceRole = role;

      if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        res.status(403).json({
          error: 'INSUFFICIENT_PERMISSIONS',
          message: `Your role '${role}' is not authorized to perform this operation. Allowed roles: ${allowedRoles.join(', ')}`,
        });
        return;
      }

      next();
    } catch (error: any) {
      res.status(500).json({
        error: 'TENANT_VERIFICATION_ERROR',
        message: 'Internal error verifying tenant authorization.',
      });
    }
  };
};
