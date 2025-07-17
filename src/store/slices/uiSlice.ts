import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isOpenEditTask: boolean;
}

const initialState: UIState = {
  isOpenEditTask: false,
};

export const uiSlice = createSlice({
  name: "userInterface",
  initialState,
  reducers: {
    setOpenEditTask(state, action: PayloadAction<boolean>) {
      state.isOpenEditTask = action.payload;
    },
  },
});
