import { Router } from 'express';
import { requireAuth, requireVerified, requireRole } from '../middleware/auth.js';
import * as eventsController from '../controllers/events.controller.js';

const router = Router();

// Reads are open to any authenticated user, including pending/read-only
// accounts — per the "browse but don't interact" rule.
router.get('/', requireAuth, eventsController.listEvents);
router.get('/:id', requireAuth, eventsController.getEvent);

// Writes require full verification.
router.post('/', requireAuth, requireVerified, requireRole('admin', 'superadmin', 'professor'), eventsController.createEvent);
router.patch('/:id', requireAuth, requireVerified, eventsController.updateEvent); // ownership check happens in controller
router.delete('/:id', requireAuth, requireVerified, eventsController.deleteEvent); // ownership/role check happens in controller

export default router;
