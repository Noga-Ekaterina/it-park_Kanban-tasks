import { z } from "zod";

export const BoardSchema = z.object({
  name: z.string().min(1, "Название доски обязательно"),
});

export const BoardResSchema = BoardSchema.extend({
  id: z.coerce.number(),
  name: z.string(),
});

export const TaskUiSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  description: z.string().min(1, "Описание обязательно"),
  status: z.number().min(0).max(2),
});

export const TaskSchema = TaskUiSchema.extend({
  id: z.coerce.number(),
});

export const TaskResSchema = TaskSchema.extend({
  board_id: z.number(),
  board_user_id: z.number(),
});

export const BoardTasksResSchema = z.object({
  id: z.number(),
  name: z.string(),
  tasks: z.array(TaskResSchema),
  user_id: z.number(),
});

export const TokenSchema = z.object({
  token: z.string(),
});
