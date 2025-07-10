import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getData } from '../../../api'
import { setBoards } from '../../../store/slices/boardsSlice'
import type { BoardResType } from '../../../types/types'
import { BoardResSchema } from '../../../types/zodShemas'

export const useFetchingBoards = () => {
	const dispatch = useDispatch()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const fetchBoards = async () => {
			setIsLoading(true)

			try {
				// 1. Показать локальные доски (если есть) до загрузки
				const cached = localStorage.getItem('boards')
				if (cached) {
					const cachedBoards: BoardResType[] = JSON.parse(cached)
					dispatch(setBoards(cachedBoards))
				}

				// 2. Получить с сервера
				const serverBoards = await getData<BoardResType[]>(
					'boards',
					BoardResSchema.array()
				)

				if (!serverBoards) {
					setErrorMessage('Ошибка загрузки досок с сервера')
					return
				}

				// 3. Перезаписать стейт и localStorage
				dispatch(setBoards(serverBoards))
				localStorage.setItem('boards', JSON.stringify(serverBoards))
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