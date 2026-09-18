import { supabaseAnon, supabaseAdmin } from '../config/supabase.js';

// Verifies the Authorization: Bearer <token> header against Supabase,
// then loads the app-level user row (role, verification_status) and
// attaches both to req.user. Downstream routes/middleware read req.user
// instead of re-fetching it.
export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Missing auth token' });
  }

  const { data: authData, error: authError } = await supabaseAnon.auth.getUser(token);
  if (authError || !authData?.user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  const { data: profile, error: profileError } = await supabaseAdmin
    .from('users')
    .select('id, role, verification_status, email, full_name')
    .eq('id', authData.user.id)
    .single();

  if (profileError || !profile) {
    return res.status(404).json({ error: 'User profile not found' });
  }

  req.user = profile;
  next();
}

// Blocks write actions for users still pending verification.
// Mount this on any route that mutates data (not on read-only GETs) —
// per the "read-only until approved" rule: pending users can browse but
// not create events, suggestions, votes, etc.
export function requireVerified(req, res, next) {
  if (req.user.verification_status !== 'approved') {
    return res.status(403).json({ error: 'Account pending verification' });
  }
  next();
}

// Restricts a route to a set of roles, e.g. requireRole('admin', 'superadmin').
export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}
