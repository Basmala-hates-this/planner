import { Router } from 'express';
import { requireAuth, requireVerified } from '../middleware/auth.js';
import * as suggestionsController from '../controllers/suggestions.controller.js';

const router = Router();

router.get('/event/:eventId', requireAuth, suggestionsController.listSuggestionsForEvent);

// Submitting a suggested time: dedups against existing suggestions for
// this event (unique constraint on event/date/start/end) — if it already
// exists, this registers a vote instead of a new row.
router.post('/event/:eventId', requireAuth, requireVerified, suggestionsController.submitOrVote);

// Professor accepts a suggestion — finalizes the event's date/time.
router.post('/:id/accept', requireAuth, requireVerified, suggestionsController.acceptSuggestion);

export default router;
