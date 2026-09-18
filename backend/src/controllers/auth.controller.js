// TODO: implement against the schema in schema.sql

export async function completeProfile(req, res) {
  // 1. Insert into `users` with verification_status = 'pending'
  // 2. Insert into `user_departments` for each selected department
  // 3. Store the uploaded ID/contract document URL
  res.status(501).json({ error: 'Not implemented yet' });
}

export async function redeemAdminKey(req, res) {
  // 1. Look up admin_keys row by hashed key + email
  // 2. Reject if redeemed_at is not null (already used) OR expires_at has passed
  // 3. On success: create/update the users row with role='admin',
  //    verification_status='approved', link to the key's department_id,
  //    and set redeemed_at = now()
  res.status(501).json({ error: 'Not implemented yet' });
}
