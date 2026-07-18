import { createClient,type SupabaseClient } from "@supabase/supabase-js";
export function createBrowserSupabase():SupabaseClient|null{const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;return url&&key?createClient(url,key):null}
