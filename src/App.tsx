
import { Header } from "./components/Header";
import { TaskInput } from "./components/TaskInput";
import { FilterBar } from "./components/FilterBar";
import { TaskList } from "./components/TaskList";
import { Login } from "./components/Login";
import { useTodos } from "./hooks/useTodos";
import { useAuth } from "./hooks/useAuth";
import { motion } from "framer-motion";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "./components/ui/button";

export default function App() {
  const { loading, isAuthenticated } = useAuth();
  const {
    tasks,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    clearCompleted,
    isSyncing,
    stats,
  } = useTodos();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-background text-foreground min-h-screen font-sans">
        <Header isSyncing={isSyncing} />
        <main className="max-w-2xl mx-auto px-6 pt-20">
          <Login />
        </main>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen font-sans">
      <Header isSyncing={isSyncing} />

      <main className="max-w-2xl mx-auto px-6 pt-12 pb-32">
        <TaskInput onAddTask={addTask} />

        <FilterBar
          currentFilter={filter}
          onFilterChange={setFilter}
          pendingCount={stats.pending}
        />

        <TaskList
          tasks={tasks}
          filter={filter}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onUpdate={updateTask}
        />

        {stats.hasCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 flex justify-center"
          >
            <Button
              variant="ghost"
              onClick={clearCompleted}
              className="text-muted-foreground hover:text-destructive gap-2 font-semibold uppercase tracking-widest text-[10px]"
            >
              <Trash2 className="h-4 w-4" />
              Limpar concluídas
            </Button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
