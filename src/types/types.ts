import { z } from "zod";
import {
  BoardResSchema,
  BoardSchema,
  TasksResSchema,
  TaskSchema,
} from "./zodShemas.ts";

export type BoardType = z.infer<typeof BoardSchema>;
export type BoardResType = z.infer<typeof BoardResSchema>;
export type TaskType = z.infer<typeof TaskSchema>;
export type TasksResType = z.infer<typeof TasksResSchema>;
export type TasksType = TasksResType["tasks"];
export type BoardFormType = z.infer<typeof BoardSchema>

