import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://hbjcyvggyknxlcjeotvj.supabase.co"; // Remplace avec ton URL Supabase
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiamN5dmdneWtueGxjamVvdHZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MTkwMzcsImV4cCI6MjA1NTM5NTAzN30.B-e6q7WevLnhFR452slTQvVPufOoIH03MDlHjxXb93E"; // Remplace avec ta clé API

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export default supabase;