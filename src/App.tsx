
import { Header } from "./components/Header";
import { TaskInput } from "./components/TaskInput";
import { FilterBar } from "./components/FilterBar";
import { TaskItem } from "./components/TaskItem";
import { EmptyState } from "./components/EmptyState";
import { useTodos } from "./hooks/useTodos";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const {
    tasks,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    clearCompleted,
    stats,
  } = useTodos();

  return (
    <div className="bg-surface text-on-surface min-h-screen font-sans">
      <Header />

      <main className="max-w-2xl mx-auto px-6 pt-12 pb-32">
        <TaskInput onAddTask={addTask} />

        <FilterBar
          currentFilter={filter}
          onFilterChange={setFilter}
          pendingCount={stats.pending}
        />

        <motion.div layout className="space-y-4">
          <AnimatePresence mode="popLayout">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  onUpdate={updateTask}
                />
              ))
            ) : (
              <EmptyState filter={filter} />
            )}
          </AnimatePresence>
        </motion.div>

        {stats.hasCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex justify-center"
          >
            <button
              onClick={clearCompleted}
              className="text-sm text-outline hover:text-error transition-colors font-medium flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">delete_sweep</span>
              Limpar tarefas concluídas
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
