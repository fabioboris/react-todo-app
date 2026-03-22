import { useState, useEffect, useMemo } from "react";
import { TaskSchema, type Task, type FilterType } from "../types/todo";
import { LOCAL_STORAGE_KEY } from "../constants";

export function useTodos() {
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

  const addTask = (title: string, metadata?: string) => {
    try {
      const newTaskData = {
        id: crypto.randomUUID(),
        title,
        completed: false,
        metadata,
        createdAt: new Date(),
      };

      const newTask = TaskSchema.parse(newTaskData);
      setTasks((prev) => [newTask, ...prev]);
    } catch (error) {
      console.error("Erro ao validar nova tarefa:", error);
    }
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, title: string) => {
    try {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id === id) {
            const updatedTask = { ...task, title };
            TaskSchema.parse(updatedTask);
            return updatedTask;
          }
          return task;
        })
      );
    } catch (error) {
      console.error("Erro ao validar atualização da tarefa:", error);
    }
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const markAllAsCompleted = () => {
    setTasks((prev) => prev.map((task) => ({ ...task, completed: true })));
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
    stats,
  };
}
