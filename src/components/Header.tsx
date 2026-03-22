
import { useAuth } from "../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Header() {
  const { user, signOut, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 w-full bg-slate-50/80 backdrop-blur-xl z-50 border-b border-slate-200/50">
      <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Espaçador para manter o título centralizado */}
        <div className="w-10 md:flex-1" />

        <h1 className="text-xl font-bold tracking-tight text-slate-900 text-center">
          Minhas Tarefas
        </h1>

        <div className="flex justify-end md:flex-1">
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
                      <p className="text-xs text-slate-400 font-label uppercase tracking-tighter">
                        Conectado como
                      </p>
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={signOut}
                    className="text-slate-500 hover:text-error focus:text-error cursor-pointer font-bold text-xs uppercase tracking-widest gap-2"
                  >
                    <span className="material-symbols-outlined text-base">
                      logout
                    </span>
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
