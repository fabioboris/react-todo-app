
import { useState, useRef, useEffect } from "react";
import { Checkbox } from "./ui/checkbox";
import type { Task } from "../types/todo";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
}

export function TaskItem({
  task,
  onToggle,
  onDelete,
  onUpdate,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (editTitle.trim() && editTitle !== task.title) {
      onUpdate(task.id, editTitle.trim());
    } else {
      setEditTitle(task.title);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    } else if (e.key === "Escape") {
      setEditTitle(task.title);
      setIsEditing(false);
    }
  };

  const metadataText = task.completed
    ? "Concluído"
    : task.metadata ||
      `Criado em ${task.createdAt.toLocaleDateString("pt-BR")}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group p-5 rounded-xl flex items-start gap-4 transition-all duration-300",
        task.completed
          ? "bg-surface-container-low/50 grayscale-[0.5] opacity-60"
          : "bg-surface-container-lowest editorial-shadow hover:bg-surface-bright"
      )}
    >
      <div className="mt-1 flex items-center pt-1">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          className="w-6 h-6 rounded-md border-2 border-outline-variant data-[state=checked]:bg-primary data-[state=checked]:text-on-primary hover:border-tertiary transition-colors"
        />
      </div>
      <div className="flex-1 min-w-0">
        <input
          ref={inputRef}
          className={cn(
            "w-full bg-transparent border-none p-0 focus:ring-0 font-body text-base leading-relaxed outline-none transition-all",
            task.completed ? "line-through text-on-surface-variant" : "text-on-surface"
          )}
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onFocus={() => setIsEditing(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          readOnly={task.completed}
        />
        <p className="text-xs text-outline-variant mt-1 truncate">
          {metadataText}
        </p>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-outline hover:text-error transition-all focus:opacity-100"
        title="Excluir tarefa"
      >
        <span className="material-symbols-outlined text-xl">delete</span>
      </button>
    </motion.div>
  );
}
