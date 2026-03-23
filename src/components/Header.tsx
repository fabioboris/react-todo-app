
import { useAuth } from "../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { LogOut, RefreshCw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface HeaderProps {
  isSyncing?: boolean;
}

export function Header({ isSyncing }: HeaderProps) {
  const { user, signOut, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 w-full bg-background/80 backdrop-blur-xl z-50 border-b border-border/50">
      <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex-1 flex items-center gap-3">
          <AnimatePresence>
            {isSyncing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 text-muted-foreground"
                title="Sincronizando com a nuvem"
              >
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span className="text-[10px] font-bold uppercase tracking-tighter hidden md:inline">
                  Sincronizando
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <h1 className="text-xl font-bold tracking-tight text-foreground text-center">
          Minhas Tarefas
        </h1>

        <div className="flex justify-end flex-1 items-center gap-2">
          <ThemeToggle />
          <AnimatePresence>
            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold cursor-pointer hover:bg-primary/20 transition-colors focus:ring-2 focus:ring-primary/20 outline-none"
                  >
                    {user?.email?.charAt(0).toUpperCase()}
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-xs text-muted-foreground font-label uppercase tracking-tighter">
                        Conectado como
                      </p>
                      <p className="text-sm font-semibold text-foreground truncate">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={signOut}
                    className="text-muted-foreground hover:text-error focus:text-error cursor-pointer font-bold text-xs uppercase tracking-widest gap-3"
                  >
                    <LogOut className="h-4 w-4 shrink-0" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
