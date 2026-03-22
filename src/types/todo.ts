import { z } from "zod";

export const TaskSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, "O título da tarefa não pode estar vazio"),
  completed: z.boolean().default(false),
  metadata: z.string().optional(),
  createdAt: z.date(),
});

export type Task = z.infer<typeof TaskSchema>;

export type FilterType = "all" | "pending" | "completed";
