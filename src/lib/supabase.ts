import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const isConfigured = 
  supabaseUrl && 
  supabaseKey && 
  isValidUrl(supabaseUrl) && 
  !supabaseUrl.includes("seu-url-aqui");

if (!isConfigured) {
  console.warn(
    "Supabase não está configurado corretamente no arquivo .env.local. " +
    "A sincronização remota será desabilitada e o app funcionará apenas localmente."
  );
}

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : (null as unknown as SupabaseClient);

export const isSupabaseConfigured = !!isConfigured;
