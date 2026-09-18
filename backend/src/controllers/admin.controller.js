// TODO: implement against the schema in schema.sql

export async function listPendingVerifications(req, res) {
  res.status(501).json({ error: 'Not implemented yet' });
}

export async function approveOrRejectUser(req, res) {
  res.status(501).json({ error: 'Not implemented yet' });
}

export async function issueAdminKey(req, res) {
  // Generate a random key, store only its hash in admin_keys along with
  // the target email + department_id, set expires_at = now() + 2h.
  // Return the raw key once here — it's never retrievable again after this.
  res.status(501).json({ error: 'Not implemented yet' });
}
