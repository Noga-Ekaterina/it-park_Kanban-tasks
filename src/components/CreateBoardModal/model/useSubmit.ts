import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { StoreState } from 'src/store'
import { useActions } from 'src/store/useActions'
import { postData } from '../../../api'
import type { BoardResType, BoardType } from '../../../types/types'
import { BoardResSchema, BoardSchema } from '../../../types/zodShemas'

export const useSubmit = () => {
	const { addBoard, setActiveBoard } = useActions()
	const { boards } = useSelector((state: StoreState) => state.boards)
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<BoardType>({
		resolver: zodResolver(BoardSchema),
		mode: 'onChange',
	})

	const submitHandler = async (data: BoardType) => {
		const nameTrimmed = data.name.trim()

		//Проверка на уникальность
		const isDuplicate = boards.some(
			(board) => board.name.toLowerCase() === nameTrimmed.toLowerCase()
		)

		if (isDuplicate) {
			setError('name', {
				type: 'manual',
				message: 'This board name already exists',
			})
			return
		}

		try {
			const createdBoard = await postData<BoardResType>(
				'boards/create',
				{ name: data.name },
				BoardResSchema
			)

			if (createdBoard) {
				addBoard(createdBoard)
				setActiveBoard(createdBoard.id)

				navigate(`/boards/${createdBoard.id}`, { replace: true })
			}

			console.log(createdBoard)
		} catch {
			alert('Ошибка при создании доски')
		}
	}
	return { register, handleSubmit, errors, submitHandler }
}
