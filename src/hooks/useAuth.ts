import { useState, useEffect } from "react";
import { isSupabaseConfigured } from "../lib/supabase";
import type { User, Session } from "@supabase/supabase-js";
import { authService } from "../services/authService";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(!isSupabaseConfigured ? false : true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return;
    }

    // Carregar sessão inicial
    authService.getSession().then((session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Escutar mudanças na autenticação (login, logout, token refresh)
    const { data: { subscription } } = authService.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithMagicLink = async (email: string) => {
    await authService.signInWithMagicLink(email);
  };

  const signOut = async () => {
    await authService.signOut();
  };

  return {
    user,
    session,
    loading,
    signInWithMagicLink,
    signOut,
    isAuthenticated: !!user,
  };
}
