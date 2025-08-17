import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { BoardResType } from "../../types/types.ts";
import type { StoreState } from "../index.ts";

type BoardsState = {
  boards: BoardResType[];
};

const initialState: BoardsState = {
  boards: [],
};

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    getBoards(state, action: PayloadAction<BoardResType[]>) {
      state.boards = action.payload;
    },
    addBoard(state, action: PayloadAction<BoardResType>) {
      const newBoard = action.payload;
      state.boards.push(newBoard);
    },
  },
});

export const boardsActions = boardsSlice.actions;

export const useBoardsState = () =>
  useSelector((state: StoreState) => state.boards);
