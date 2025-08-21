import { configureStore } from "@reduxjs/toolkit";
import { tasksSlice } from "./slices/tasksSlice.ts";
import { boardsSlice } from "./slices/boardsSlice.ts";

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksSlice.reducer,
    [boardsSlice.name]: boardsSlice.reducer,
  },
});

export type StoreState = ReturnType<typeof store.getState>;
