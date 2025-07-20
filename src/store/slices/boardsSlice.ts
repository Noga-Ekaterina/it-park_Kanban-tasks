import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import type { BoardResType } from '../../types/types.ts'
import type { StoreState } from '../index.ts'

type BoardsState = {
  boards: BoardResType[]
  activeBoardId: number | null
}

const initialState: BoardsState = {
  boards: [],
  activeBoardId: null,
}

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    getBoards(state, action: PayloadAction<BoardResType[]>) {
      state.boards = action.payload
      //Сразу устанавливаем первую как активную
      state.activeBoardId = action.payload.length > 0 ? action.payload[0].id : null
    },
    addBoard(state, action: PayloadAction<BoardResType>) {
      const newBoard = action.payload
      state.boards.push(newBoard)

      // Если это первая доска — делаем её активной
      if (state.boards.length === 1) {
        state.activeBoardId = newBoard.id
      }
    },
    setActiveBoard(state, action: PayloadAction<number>) {
      state.activeBoardId = action.payload
    },
  },
})

export const boardsActions = boardsSlice.actions

export const useBoardsState = () =>
  useSelector((state: StoreState) => state.boards)