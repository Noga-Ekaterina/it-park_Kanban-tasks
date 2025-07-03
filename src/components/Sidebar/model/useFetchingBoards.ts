import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getData } from '../../../api'
import { setBoards } from '../../../store/slices/boardsSlice'
import { BoardResSchema } from '../../../types/zodShemas'
import type { BoardResType } from 'src/types/types'


export const useFetchingBoards = () => {
	const dispatch = useDispatch()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		try {
			const saved = localStorage.getItem('boards')
			if (saved) {
				const parsed = JSON.parse(saved)
				dispatch(setBoards(parsed))
			}
		} catch {
			setErrorMessage('Ошибка чтения из localStorage')
		}
		setIsLoading(false)
	}, [dispatch])

	return { isLoading, errorMessage }
}
