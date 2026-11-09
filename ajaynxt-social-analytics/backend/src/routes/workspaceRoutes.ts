import { Router } from 'express';
import { authenticateToken, AuthenticatedRequest } from '../middleware/authMiddleware';
import { requireWorkspaceAccess } from '../middleware/tenantIsolation';

const router = Router();

// List workspaces for user
router.get('/', authenticateToken, (req: AuthenticatedRequest, res) => {
  res.json({
    workspaces: [
      {
        workspaceId: 'ws_ajaynxt_media',
        name: 'AJAYNXT Creative Media',
        role: 'workspace_owner',
      },
    ],
  });
});

// Get specific workspace details
router.get(
  '/:workspaceId',
  authenticateToken,
  requireWorkspaceAccess(['workspace_owner', 'workspace_admin', 'workspace_member']),
  (req: AuthenticatedRequest, res) => {
    res.json({
      workspaceId: req.workspaceId,
      name: 'AJAYNXT Creative Media',
      plan: 'pro_agency',
    });
  }
);

// Create a new workspace
router.post('/', authenticateToken, (req: AuthenticatedRequest, res) => {
  const { name, plan = 'starter' } = req.body;
  if (!name) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }

  const workspaceId = `ws_${Date.now()}`;
  res.status(201).json({
    workspaceId,
    name,
    plan,
    ownerUid: req.user?.uid,
    createdAt: new Date().toISOString(),
  });
});

export default router;
