import { createClient, SupabaseClient } from '@supabase/supabase-js';

// =====================================================
// SUPABASE CLIENT - Auth + Database
// Setup: https://supabase.com → Create project → Get URL & anon key
// =====================================================

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Create real client if configured, otherwise null
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// =====================================================
// AUTH HELPERS
// =====================================================

export async function signUpWithEmail(email: string, password: string, fullName?: string) {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.' } };
  }
  return await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
}

export async function signInWithEmail(email: string, password: string) {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured.' } };
  }
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function signInWithGoogle() {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured.' } };
  }
  return await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin },
  });
}

export async function signOut() {
  if (!supabase) return { error: null };
  return await supabase.auth.signOut();
}

export async function getCurrentUser() {
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// =====================================================
// DATABASE HELPERS
// =====================================================
// Required Supabase tables:
// - leads (id, user_id, name, email, company, status, source, relevance, created_at)
// - websites (id, user_id, url, seo_score, ai_score, last_audit)
// - activities (id, user_id, agent, action, detail, created_at)
// - subscriptions (id, user_id, plan, stripe_customer_id, status, current_period_end)

export async function fetchLeads(userId: string) {
  if (!supabase) return { data: [], error: null };
  return await supabase
    .from('leads')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
}

export async function createLead(lead: any) {
  if (!supabase) return { data: null, error: { message: 'Not configured' } };
  return await supabase.from('leads').insert(lead).select().single();
}

export async function updateLeadStatus(id: number, status: string) {
  if (!supabase) return { data: null, error: { message: 'Not configured' } };
  return await supabase.from('leads').update({ status }).eq('id', id);
}

export async function logActivity(userId: string, agent: string, action: string, detail: string) {
  if (!supabase) return;
  return await supabase.from('activities').insert({ user_id: userId, agent, action, detail });
}
