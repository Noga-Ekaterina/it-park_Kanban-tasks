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

export const TasksResSchema = z.object({
  id: z.number(),
  name: z.string(),
  tasks: z.array(
    TaskSchema.extend({
      id: z.coerce.number(),
      board_id: z.number(),
      board_user_id: z.string(),
    })
  ),
  user_id: z.string(),
});
