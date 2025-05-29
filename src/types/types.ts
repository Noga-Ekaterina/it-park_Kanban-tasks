import { z } from "zod";
import {
  BoardResSchema,
  BoardSchema,
  TaskResSchema,
  TaskSchema,
} from "./zodShemas.ts";

export type BoardType = z.infer<typeof BoardSchema>;
export type BoardResType = z.infer<typeof BoardResSchema>;
export type TaskType = z.infer<typeof TaskSchema>;
export type TaskResType = z.infer<typeof TaskResSchema>;
