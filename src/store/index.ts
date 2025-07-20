import { configureStore } from '@reduxjs/toolkit'
import { boardsSlice } from './slices/boardsSlice.ts'
import { tasksSlice } from './slices/tasksSlice.ts'

export const store = configureStore({
	reducer: {
		[tasksSlice.name]: tasksSlice.reducer,
		[boardsSlice.name]: boardsSlice.reducer,
	},
})

export type StoreState = ReturnType<typeof store.getState>
