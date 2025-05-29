import { z } from "zod";

export const BoardSchema = z.object({
  name: z.string().min(1, "Название доски обязательно"),
});

export const BoardResSchema = BoardSchema.extend({
  id: z.coerce.number(),
});

export const TaskSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  description: z.string().optional(),
  status: z.number(),
});

export const TaskResSchema = TaskSchema.extend({
  id: z.coerce.number(),
});
