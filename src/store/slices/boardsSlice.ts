import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { BoardType } from 'src/types/types'

const initialState: BoardType[] = []

export const boardsSlice = createSlice({
	name: 'boards',
	initialState,
	reducers: {
		setBoards: (state, action: PayloadAction<BoardType[]>) => {
			state.length = 0
			state.push(...action.payload)
		},
		pushNewBoard: (state, action: PayloadAction<BoardType>) => {
			state.push(action.payload)
		},
	},
})

export const { setBoards, pushNewBoard } = boardsSlice.actions
export default boardsSlice.reducer
