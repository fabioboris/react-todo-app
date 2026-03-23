import { motion, AnimatePresence } from "framer-motion";
import type { Task, FilterType } from "../types/todo";
import { TaskItem } from "./TaskItem";
import { EmptyState } from "./EmptyState";

interface TaskListProps {
  tasks: Task[];
  filter: FilterType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
}

export function TaskList({
  tasks,
  filter,
  onToggle,
  onDelete,
  onUpdate,
}: TaskListProps) {
  return (
    <motion.div layout className="space-y-4">
      <AnimatePresence mode="popLayout">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))
        ) : (
          <EmptyState filter={filter} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
