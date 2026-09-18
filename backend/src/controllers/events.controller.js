// TODO: implement against the schema in schema.sql

export async function listEvents(req, res) {
  // Filter by department_id (scoped to req.user's department unless
  // admin/superadmin), date range for calendar views, and status.
  res.status(501).json({ error: 'Not implemented yet' });
}

export async function getEvent(req, res) {
  res.status(501).json({ error: 'Not implemented yet' });
}

export async function createEvent(req, res) {
  // Remember: conflict detection (room+time collision) belongs here,
  // before the insert commits — not as a report run afterward.
  res.status(501).json({ error: 'Not implemented yet' });
}

export async function updateEvent(req, res) {
  // Ownership check: professor can only edit their own events;
  // admin can edit any event within their department; superadmin — any.
  res.status(501).json({ error: 'Not implemented yet' });
}

export async function deleteEvent(req, res) {
  res.status(501).json({ error: 'Not implemented yet' });
}
