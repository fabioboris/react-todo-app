import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

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
      const errorResponse = err as { status?: number; message?: string };
      if (errorResponse.status === 429) {
        setError(
          "Muitas tentativas. Por favor, aguarde um minuto antes de tentar novamente."
        );
      } else {
        setError(
          err instanceof Error ? err.message : "Erro ao enviar o link de acesso."
        );
      }
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md"
          >
            <Card className="border-none shadow-2xl bg-surface-container-lowest">
              <CardHeader className="space-y-4 pt-8">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <span className="material-symbols-outlined text-4xl">
                    login
                  </span>
                </div>
                <CardTitle className="text-3xl font-extrabold font-heading tracking-tight">
                  Bem-vindo
                </CardTitle>
                <CardDescription className="text-base text-on-surface-variant font-body">
                  Insira seu e-mail para receber um link de acesso mágico.
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-8">
                <form onSubmit={handleLogin} className="space-y-4 text-left">
                  <div className="space-y-2">
                    <div className="relative group">
                      <Input
                        type="email"
                        required
                        placeholder="seu-email@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={cn(
                          "h-14 px-4 rounded-xl border-2 border-transparent bg-surface-container-low focus:bg-surface-container-lowest transition-all text-lg",
                          error && "border-error/20 bg-error-container/5"
                        )}
                      />
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">
                        alternate_email
                      </span>
                    </div>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-error text-sm font-medium flex items-center gap-2 bg-error/5 p-3 rounded-lg"
                    >
                      <span className="material-symbols-outlined text-lg">
                        error
                      </span>
                      {error}
                    </motion.p>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading || !email}
                    className="w-full h-14 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                  >
                    {isLoading ? "Enviando..." : "Enviar link mágico"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="login-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <Card className="border-none shadow-2xl bg-surface-container-lowest py-8">
              <CardContent className="space-y-6">
                <div className="mx-auto w-20 h-20 rounded-full bg-success/10 flex items-center justify-center text-success animate-bounce">
                  <span className="material-symbols-outlined text-5xl">
                    mark_email_read
                  </span>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-extrabold font-heading tracking-tight">
                    Verifique seu e-mail
                  </h1>
                  <p className="text-on-surface-variant font-body leading-relaxed text-lg">
                    Enviamos um link mágico para{" "}
                    <strong className="text-on-surface">{email}</strong>.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setIsSent(false)}
                  className="text-primary font-semibold hover:bg-primary/5 gap-2"
                >
                  <span className="material-symbols-outlined text-lg">
                    arrow_back
                  </span>
                  Tentar outro e-mail
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
