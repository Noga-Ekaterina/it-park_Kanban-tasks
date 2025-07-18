import type { BoardResType } from "../../types/types.ts";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { StoreState } from "../index.ts";

const initialState: { boards: BoardResType[] } = {
  boards: [],
};

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    getBoards(state, action: PayloadAction<BoardResType[]>) {
      state.boards = action.payload;
    },
    addBoard(state, action: PayloadAction<{ name: string; user_id: number }>) {
      const maxId =
        state.boards.length > 0
          ? Math.max(...state.boards.map((board) => board.id))
          : 0;

      const newBoard: BoardResType = {
        id: maxId + 1,
        name: action.payload.name,
        user_id: action.payload.user_id,
      };

      state.boards = [...state.boards, newBoard];
    },
    deleteBoard(state, action: PayloadAction<BoardResType["id"]>) {
      const id = action.payload;
      const newArray = state.boards;
      const index = newArray.findIndex((el) => el.id === id);
      if (index < 0) return;
      newArray.splice(index, 1);
      state.boards = newArray;
    },
    editBoard(state, action: PayloadAction<BoardResType>) {
      const id = action.payload["id"];
      const newName = action.payload["name"];
      const newArray = state.boards;
      const index = newArray.findIndex((el) => el.id === id);
      if (index < 0) return;
      newArray[index].name = newName;
      state.boards = newArray;
    },
  },
});

export const boardsActions = boardsSlice.actions;
export const useBoardsState = () =>
  useSelector((state: StoreState) => state.boards);
