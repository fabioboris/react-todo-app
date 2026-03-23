
import { useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { PlusCircle } from "lucide-react";

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
        <PlusCircle className="h-6 w-6 text-outline shrink-0" />
        <Input
          className="bg-transparent border-none focus-visible:ring-0 w-full outline-none text-lg font-body placeholder:text-outline-variant text-on-surface"
          placeholder="Nova tarefa"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          type="submit"
          disabled={!title.trim()}
          className="bg-tertiary text-on-tertiary hover:bg-tertiary/90 px-6 rounded-full font-semibold shrink-0"
        >
          Adicionar
        </Button>
      </form>
    </section>
  );
}
