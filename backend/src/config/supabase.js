import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Service-role client: full DB access, used by the backend for
// operations that need to bypass RLS (e.g. admin key redemption).
// Never send this key to the frontend.
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Anon client: used to verify a user's JWT on incoming requests.
// RLS policies still apply when a request is scoped to this client.
export const supabaseAnon = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
