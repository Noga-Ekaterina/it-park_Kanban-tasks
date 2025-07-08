import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice} from '@reduxjs/toolkit'
import type { BoardResType } from '../../types/types'

const initialState: BoardResType[] = []

export const boardsSlice = createSlice({
	name: 'boards',
	initialState,
	reducers: {
		setBoards: (state, action: PayloadAction<BoardResType[]>) => {
			state.length = 0
			state.push(...action.payload)
		},
		pushNewBoard: (state, action: PayloadAction<BoardResType>) => {
			state.push(action.payload)
		},
	},
})

export const { setBoards, pushNewBoard } = boardsSlice.actions
export default boardsSlice.reducer