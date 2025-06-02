import { configureStore } from "@reduxjs/toolkit";
import { tasksSlice } from "./slices/tasksSlice.ts";

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksSlice.reducer,
  },
});

export type StoreState = ReturnType<typeof store.getState>;
