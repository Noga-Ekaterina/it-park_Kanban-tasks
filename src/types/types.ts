import { z } from "zod";
import {
  BoardResSchema,
  BoardSchema,
  TaskSchema,
  BoardTasksResSchema,
  TaskUiSchema,
  TaskResSchema,
} from "./zodShemas.ts";

export type BoardType = z.infer<typeof BoardSchema>;
export type BoardResType = z.infer<typeof BoardResSchema>;
export type TaskType = z.infer<typeof TaskSchema>;
export type TaskUiType = z.infer<typeof TaskUiSchema>;
export type BoardTasksResType = z.infer<typeof BoardTasksResSchema>;
export type TasksType = BoardTasksResType["tasks"];
export type TaskResType = z.infer<typeof TaskResSchema>;
