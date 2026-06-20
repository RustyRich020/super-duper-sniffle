// Supabase client factory. Credentials come from public env vars (anon key is
// safe client-side when row-level security is configured). Falls back to any
// values the user has saved in localStorage via the "Connect DB" dialog.
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const ENV_SUPABASE = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
};

export interface SupaCreds {
  url: string;
  key: string;
}

const STORAGE_KEY = "qq_supabase";

export function loadSavedCreds(): SupaCreds | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as SupaCreds;
      // Only honor a complete saved record; otherwise fall through to env so a
      // stale/partial localStorage object can't permanently shadow valid creds.
      if (saved && saved.url && saved.key) return saved;
    }
  } catch {
    /* ignore */
  }
  if (ENV_SUPABASE.url && ENV_SUPABASE.key) return { ...ENV_SUPABASE };
  return null;
}

export function saveCreds(creds: SupaCreds) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(creds));
  } catch {
    /* ignore */
  }
}

export function clearCreds() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

let cached: { url: string; key: string; client: SupabaseClient } | null = null;

export function getClient(url: string, key: string): SupabaseClient {
  if (cached && cached.url === url && cached.key === key) return cached.client;
  const client = createClient(url, key);
  cached = { url, key, client };
  return client;
}
