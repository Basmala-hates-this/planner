import { supabaseAdmin } from '../config/supabase.js';
import { generateRawKey, hashKey } from '../utils/crypto.js';

export async function issueAdminKey(req, res) {
  const { email, departmentId } = req.body;
  if (!email || !departmentId) {
    return res.status(400).json({ error: 'email and departmentId are required' });
  }

  const rawKey = generateRawKey();
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours,no question

  const { error } = await supabaseAdmin.from('admin_keys').insert({
    department_id: departmentId,
    issued_by: req.user.id, // req.user, not req.authUser — this route sits behind requireAuth, which loads the full profile
    email,
    key_hash: hashKey(rawKey),
    expires_at: expiresAt.toISOString(),
  });
  if (error) return res.status(500).json({ error: error.message });

  // Raw key is returned exactly once, here — it's never retrievable again
  // after this response (only the hash is stored).
  res.status(201).json({ key: rawKey, expiresAt });
}


export async function listPendingVerifications(req, res) {
  res.status(501).json({ error: 'Not implemented yet' });
}

export async function approveOrRejectUser(req, res) {
  res.status(501).json({ error: 'Not implemented yet' });
}


