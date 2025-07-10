import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getData } from '../../../api'
import { setBoards } from '../../../store/slices/boardsSlice'
import type { BoardResType } from '../../../types/types'
import { BoardResSchema } from '../../../types/zodShemas'

// Простая функция для объединения досок
function mergeBoards(local: BoardResType[], server: BoardResType[]): BoardResType[] {
	const onlyLocal = local.filter(localBoard => {
		return !server.some(serverBoard => serverBoard.id === localBoard.id)
	})
	return [...server, ...onlyLocal]
}

export const useFetchingBoards = () => {
	const dispatch = useDispatch()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const fetchBoards = async () => {
			setIsLoading(true)

			try {
				let cachedBoards: BoardResType[] = []
				const cached = localStorage.getItem('boards')

				if (cached) {
					cachedBoards = JSON.parse(cached)
					dispatch(setBoards(cachedBoards))
				}

				const serverBoards = await getData<BoardResType[]>(
					'boards',
					BoardResSchema.array()
				)
				

				if (serverBoards) {
					const merged = mergeBoards(cachedBoards, serverBoards)
					dispatch(setBoards(merged))
					localStorage.setItem('boards', JSON.stringify(merged))
				}
			} catch {
				setErrorMessage('Ошибка загрузки досок с сервера')
			} finally {
				setIsLoading(false)
			}
		}

		fetchBoards()
	}, [dispatch])

	return { isLoading, errorMessage }
}