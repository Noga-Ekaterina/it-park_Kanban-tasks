import type { TasksType, TaskType } from "../../types/types.ts";
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
    changeTaskStatus(
      state,
      {
        payload,
      }: {
        payload: {
          board: string;
          id: TaskType["id"];
          newStatus: TaskType["status"];
        };
      },
    ) {
      const { board, id, newStatus } = payload;
      const index = state.tasks[board]?.findIndex((task) => task.id === id);

      if (index < 0) return;

      state.tasks[board][index].status = newStatus;
    },
  },
});

export const tasksActions = tasksSlice.actions;
export const useTasksState = () =>
  useSelector((state: StoreState) => state.tasks);
