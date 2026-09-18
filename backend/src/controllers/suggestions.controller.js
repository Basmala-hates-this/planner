// TODO: implement against the schema in schema.sql

export async function listSuggestionsForEvent(req, res) {
  // Return suggestions sorted by vote count desc (join against
  // suggestion_votes count) — matches the "highest at top" design.
  res.status(501).json({ error: 'Not implemented yet' });
}

export async function submitOrVote(req, res) {
  // 1. Try inserting into `suggestions` (event_id, date, start, end).
  // 2. On unique-constraint conflict, fetch the existing suggestion id instead.
  // 3. Insert into suggestion_votes (suggestion_id, user_id) —
  //    the composite PK makes a repeat vote from the same user a no-op.
  res.status(501).json({ error: 'Not implemented yet' });
}

export async function acceptSuggestion(req, res) {
  // Only the event's owner (professor) or an admin/superadmin may accept.
  // On accept: update the event's date/time from the suggestion,
  // set status appropriately, and re-run conflict detection.
  res.status(501).json({ error: 'Not implemented yet' });
}
