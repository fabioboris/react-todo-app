import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

export function Login() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithMagicLink } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await signInWithMagicLink(email);
      setIsSent(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao enviar o link de acesso.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <AnimatePresence mode="wait">
        {!isSent ? (
          <motion.div
            key="login-form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md space-y-8"
          >
            <div className="space-y-2">
              <span className="material-symbols-outlined text-5xl text-primary mb-4 block">
                login
              </span>
              <p className="text-on-surface-variant font-body leading-relaxed">
                Insira seu e-mail abaixo para receber um link de acesso mágico.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative group">
                <input
                  type="email"
                  required
                  placeholder="seu-email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(
                    "w-full bg-surface-container-low p-4 pr-12 rounded-xl border-2 border-transparent outline-none transition-all font-body text-lg",
                    "focus:bg-surface-container-lowest focus:border-primary/20 focus:ring-4 focus:ring-primary/5",
                    error && "border-error/20 bg-error-container/10"
                  )}
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">
                  alternate_email
                </span>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-error text-sm font-medium flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">error</span>
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={isLoading || !email}
                className={cn(
                  "w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all",
                  "hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed",
                  isLoading && "cursor-wait"
                )}
              >
                {isLoading ? "Enviando..." : "Enviar link mágico"}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="login-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md space-y-6"
          >
            <span className="material-symbols-outlined text-6xl text-success mb-4 block animate-bounce">
              mark_email_read
            </span>
            <h1 className="text-3xl font-extrabold font-heading tracking-tight text-on-background">
              Verifique seu e-mail
            </h1>
            <p className="text-on-surface-variant font-body leading-relaxed text-lg">
              Enviamos um link de acesso mágico para <strong className="text-on-surface">{email}</strong>.
              Acesse sua caixa de entrada para fazer login.
            </p>
            <button
              onClick={() => setIsSent(false)}
              className="text-primary font-semibold hover:underline flex items-center justify-center gap-2 mx-auto"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Voltar e tentar outro e-mail
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
