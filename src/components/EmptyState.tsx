import { motion } from "framer-motion";
import type { FilterType } from "../types/todo";

interface EmptyStateProps {
  filter: FilterType;
}

export function EmptyState({ filter }: EmptyStateProps) {
  const message = filter === "all"
    ? "Sua lista está vazia. Comece adicionando uma tarefa!"
    : "Nenhuma tarefa encontrada para este filtro.";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 0.5, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="border-2 border-dashed border-surface-container-highest rounded-xl p-8 flex flex-col items-center justify-center text-center hover:opacity-80 transition-opacity cursor-pointer"
    >
      <span className="material-symbols-outlined text-3xl mb-2 text-outline">
        lightbulb
      </span>
      <p className="text-sm font-body">
        {message}
      </p>
    </motion.div>
  );
}
