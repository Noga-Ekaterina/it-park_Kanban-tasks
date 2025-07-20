import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { StoreState } from 'src/store'
import { boardsActions } from 'src/store/slices/boardsSlice'

export const useActiveBoard = () => {
	const dispatch = useDispatch()
	const { boards, activeBoardId } = useSelector(
		(state: StoreState) => state.boards
	)

	useEffect(() => {
		if (boards.length === 0) return

		const savedId = localStorage.getItem('activeBoardId')
		const parsedId = savedId ? Number(savedId) : null
		const exists = boards.some((b) => b.id === parsedId)

		if (parsedId && exists) {
			dispatch(boardsActions.setActiveBoard(parsedId))
		} else {
			const firstId = boards[0].id
			dispatch(boardsActions.setActiveBoard(firstId))
			localStorage.setItem('activeBoardId', firstId.toString())
		}
	}, [boards, dispatch])

	const handleSelectBoard = (id: number) => {
		dispatch(boardsActions.setActiveBoard(id))
		localStorage.setItem('activeBoardId', id.toString())
	}
	return { boards, activeBoardId, handleSelectBoard }
}
