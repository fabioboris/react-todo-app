
import { useState } from "react";
import { cn } from "../lib/utils";

interface TaskInputProps {
  onAddTask: (title: string) => void;
}

export function TaskInput({ onAddTask }: TaskInputProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim());
      setTitle("");
    }
  };

  return (
    <section className="mb-10 group">
      <form
        onSubmit={handleSubmit}
        className={cn(
          "bg-surface-container-low p-4 rounded-xl flex items-center gap-4 transition-all duration-300",
          "focus-within:bg-surface-container-lowest focus-within:ring-2 focus-within:ring-tertiary/10"
        )}
      >
        <span className="material-symbols-outlined text-outline">
          add_circle
        </span>
        <input
          className="bg-transparent border-none focus:ring-0 w-full outline-none text-lg font-body placeholder:text-outline-variant text-on-surface"
          placeholder="Nova tarefa"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="submit"
          disabled={!title.trim()}
          className={cn(
            "bg-tertiary text-on-tertiary px-6 py-2.5 rounded-full font-semibold text-sm transition-all",
            "hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          Adicionar
        </button>
      </form>
    </section>
  );
}
