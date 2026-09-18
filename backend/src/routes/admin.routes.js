import { Router } from 'express';
import { requireAuth, requireVerified, requireRole } from '../middleware/auth.js';
import * as adminController from '../controllers/admin.controller.js';

const router = Router();

// Pending verification queue — dept admin sees their own department's
// pending users; superadmin sees all.
router.get('/pending-verifications', requireAuth, requireVerified, requireRole('admin', 'superadmin'), adminController.listPendingVerifications);
router.post('/verify/:userId', requireAuth, requireVerified, requireRole('admin', 'superadmin'), adminController.approveOrRejectUser);

// Superadmin issues a single-use, email-locked admin key for a department.
router.post('/issue-admin-key', requireAuth, requireVerified, requireRole('superadmin'), adminController.issueAdminKey);

export default router;
