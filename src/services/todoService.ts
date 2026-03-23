import { supabase, isSupabaseConfigured } from "../lib/supabase";
import type { Task } from "../types/todo";

/**
 * Interface for the remote database schema (PostgreSQL/Supabase)
 */
interface RemoteTask {
  id: string;
  title: string;
  completed: boolean;
  metadata?: string | null;
  created_at: string;
  user_id?: string | null;
}

/**
 * Mapper from RemoteTask (Supabase) to Task (App)
 */
const mapRemoteToLocal = (task: RemoteTask): Task => ({
  id: task.id,
  title: task.title,
  completed: task.completed,
  metadata: task.metadata || undefined,
  createdAt: new Date(task.created_at),
  userId: task.user_id || undefined,
});

/**
 * Mapper from Task (App) to RemoteTask (Supabase)
 */
const mapLocalToRemote = (task: Task) => ({
  id: task.id,
  title: task.title,
  completed: task.completed,
  metadata: task.metadata,
  created_at: task.createdAt.toISOString(),
  user_id: task.userId,
});

export const todoService = {
  async fetchTasks(userId: string): Promise<Task[]> {
    if (!isSupabaseConfigured) return [];
    
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data as RemoteTask[]).map(mapRemoteToLocal);
  },

  async addTask(task: Task): Promise<void> {
    if (!isSupabaseConfigured) return;
    const { error } = await supabase
      .from("todos")
      .insert([mapLocalToRemote(task)]);
    if (error) throw error;
  },

  async updateTask(id: string, updates: Partial<Pick<Task, 'title' | 'completed'>>): Promise<void> {
    if (!isSupabaseConfigured) return;
    
    const remoteUpdates: any = {};
    if (updates.title !== undefined) remoteUpdates.title = updates.title;
    if (updates.completed !== undefined) remoteUpdates.completed = updates.completed;

    const { error } = await supabase
      .from("todos")
      .update(remoteUpdates)
      .eq("id", id);
    if (error) throw error;
  },

  async deleteTask(id: string): Promise<void> {
    if (!isSupabaseConfigured) return;
    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id);
    if (error) throw error;
  },

  async deleteTasks(ids: string[]): Promise<void> {
    if (!isSupabaseConfigured) return;
    const { error } = await supabase
      .from("todos")
      .delete()
      .in("id", ids);
    if (error) throw error;
  },

  async markTasksAsCompleted(ids: string[]): Promise<void> {
    if (!isSupabaseConfigured) return;
    const { error } = await supabase
      .from("todos")
      .update({ completed: true })
      .in("id", ids);
    if (error) throw error;
  }
};
