import { useState, useEffect, useMemo, useCallback } from "react";
import { TaskSchema, type Task, type FilterType } from "../types/todo";
import { LOCAL_STORAGE_KEY } from "../constants";
import { isSupabaseConfigured } from "../lib/supabase";
import { useAuth } from "./useAuth";
import { todoService } from "../services/todoService";

export function useTodos() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.map((task: Task) => ({
          ...task,
          createdAt: new Date(task.createdAt),
        }));
      } catch (error) {
        console.error("Erro ao carregar tarefas do localStorage:", error);
        return [];
      }
    }
    return [];
  });

  const [filter, setFilter] = useState<FilterType>("all");
  const [isSyncing, setIsSyncing] = useState(false);

  // Sincronização remota: Carregar ao iniciar
  const fetchRemoteTasks = useCallback(async () => {
    if (!isSupabaseConfigured || !user) return;
    
    setIsSyncing(true);
    try {
      const remoteTasks = await todoService.fetchTasks(user.id);
      setTasks(remoteTasks);
    } catch (error) {
      console.warn("Falha ao sincronizar remotamente. Usando apenas local.", error);
    } finally {
      setIsSyncing(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchRemoteTasks();
    } else {
      setTasks([]);
    }
  }, [fetchRemoteTasks, user]);

  // Salvar no localStorage sempre que as tarefas mudarem
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "pending":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const addTask = async (title: string, metadata?: string) => {
    const newTaskData = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      metadata,
      createdAt: new Date(),
      userId: user?.id,
    };

    try {
      const newTask = TaskSchema.parse(newTaskData);
      
      // Update local state instantly (Optimistic UI)
      setTasks((prev) => [newTask, ...prev]);

      // Sync to remote
      if (isSupabaseConfigured && user) {
        await todoService.addTask(newTask);
      }
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      // Rollback local state
      setTasks((prev) => prev.filter(t => t.id !== newTaskData.id));
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const previousStatus = task.completed;
    const newStatus = !previousStatus;

    // Update local state instantly (Optimistic UI)
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: newStatus } : t))
    );

    // Sync to remote
    if (isSupabaseConfigured) {
      try {
        await todoService.updateTask(id, { completed: newStatus });
      } catch (error) {
        console.error("Erro ao atualizar tarefa remotamente:", error);
        // Rollback local state
        setTasks((prev) =>
          prev.map((t) => (t.id === id ? { ...t, completed: previousStatus } : t))
        );
      }
    }
  };

  const deleteTask = async (id: string) => {
    const taskToDelete = tasks.find(t => t.id === id);
    if (!taskToDelete) return;

    // Update local state instantly (Optimistic UI)
    setTasks((prev) => prev.filter((task) => task.id !== id));

    // Sync to remote
    if (isSupabaseConfigured) {
      try {
        await todoService.deleteTask(id);
      } catch (error) {
        console.error("Erro ao excluir tarefa remotamente:", error);
        // Rollback local state
        setTasks((prev) => [taskToDelete, ...prev].sort((a, b) => 
          b.createdAt.getTime() - a.createdAt.getTime()
        ));
      }
    }
  };

  const updateTask = async (id: string, title: string) => {
    const originalTask = tasks.find(t => t.id === id);
    if (!originalTask) return;

    try {
      const updatedTask = { ...originalTask, title };
      TaskSchema.parse(updatedTask);

      // Update local state instantly (Optimistic UI)
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );

      // Sync to remote
      if (isSupabaseConfigured) {
        await todoService.updateTask(id, { title });
      }
    } catch (error) {
      console.error("Erro ao atualizar título remotamente:", error);
      // Rollback local state
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? originalTask : task))
      );
    }
  };

  const clearCompleted = async () => {
    const completedTasks = tasks.filter((task) => task.completed);
    if (completedTasks.length === 0) return;

    const completedIds = completedTasks.map((task) => task.id);

    // Update local state instantly (Optimistic UI)
    setTasks((prev) => prev.filter((task) => !task.completed));

    // Sync to remote
    if (isSupabaseConfigured) {
      try {
        await todoService.deleteTasks(completedIds);
      } catch (error) {
        console.error("Erro ao limpar tarefas concluídas remotamente:", error);
        // Rollback local state
        setTasks((prev) => [...prev, ...completedTasks].sort((a, b) => 
          b.createdAt.getTime() - a.createdAt.getTime()
        ));
      }
    }
  };

  const markAllAsCompleted = async () => {
    const pendingTasks = tasks.filter((task) => !task.completed);
    if (pendingTasks.length === 0) return;

    const pendingIds = pendingTasks.map((task) => task.id);

    // Update local state instantly (Optimistic UI)
    setTasks((prev) => prev.map((task) => ({ ...task, completed: true })));

    // Sync to remote
    if (isSupabaseConfigured) {
      try {
        await todoService.markTasksAsCompleted(pendingIds);
      } catch (error) {
        console.error("Erro ao marcar todas como concluídas remotamente:", error);
        // Rollback local state
        setTasks((prev) =>
          prev.map((task) => 
            pendingIds.includes(task.id) ? { ...task, completed: false } : task
          )
        );
      }
    }
  };

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    return {
      total,
      pending: total - completed,
      completed,
      hasCompleted: completed > 0,
    };
  }, [tasks]);

  return {
    tasks: filteredTasks,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    clearCompleted,
    markAllAsCompleted,
    isSyncing,
    stats,
  };
}
