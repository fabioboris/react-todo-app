import { supabase, isSupabaseConfigured } from "../lib/supabase";
import type { Session, AuthChangeEvent } from "@supabase/supabase-js";

export const authService = {
  async getSession(): Promise<Session | null> {
    if (!isSupabaseConfigured) return null;
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    if (!isSupabaseConfigured) return { data: { subscription: { unsubscribe: () => {} } } };
    return supabase.auth.onAuthStateChange(callback);
  },

  async signInWithMagicLink(email: string) {
    if (!isSupabaseConfigured) {
      throw new Error("Supabase não configurado corretamente.");
    }
    
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    
    if (error) throw error;
  },

  async signOut() {
    if (!isSupabaseConfigured) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
};
