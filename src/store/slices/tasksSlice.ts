import type { TasksType } from "../../types/types.ts";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { StoreState } from "../index.ts";

const initialState: { tasks: Record<string, TasksType> } = {
  tasks: {},
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTasks(
      state,
      { payload }: { payload: { tasks: TasksType; board: string } },
    ) {
      state.tasks[payload.board] = payload.tasks;
    },
  },
});

export const tasksActions = tasksSlice.actions;
export const useTasksState = () =>
  useSelector((state: StoreState) => state.tasks);
