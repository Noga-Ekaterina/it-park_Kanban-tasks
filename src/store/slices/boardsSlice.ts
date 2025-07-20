import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import type { BoardResType } from '../../types/types.ts'
import type { StoreState } from '../index.ts'

const initialState: { boards: BoardResType[] } = {
	boards: [],
}

export const boardsSlice = createSlice({
	name: 'boards',
	initialState,
	reducers: {
		getBoards(state, action: PayloadAction<BoardResType[]>) {
			state.boards = action.payload
		},
		addBoard(state, action: PayloadAction<BoardResType>) {
			const maxId =
				state.boards.length > 0
					? Math.max(...state.boards.map((board) => board.id))
					: 0

			const newBoard: BoardResType = {
				id: maxId + 1,
				name: action.payload.name,
			}

			state.boards = [...state.boards, newBoard]
		},
	},
})

export const boardsActions = boardsSlice.actions
export const useBoardsState = () =>
	useSelector((state: StoreState) => state.boards)
