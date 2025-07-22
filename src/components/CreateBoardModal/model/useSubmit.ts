import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useActions } from 'src/store/useActions'
import { postData } from '../../../api'
import type { BoardResType, BoardType } from '../../../types/types'
import { BoardResSchema, BoardSchema } from '../../../types/zodShemas'
import type { Close } from '../ui/CreateBoardModal'

export const useSubmit = ({ onClose }: Close) => {
	const { addBoard } = useActions()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<BoardType>({
		resolver: zodResolver(BoardSchema),
		mode: 'onChange',
	})

	const submitHandler = async (data: BoardType) => {
		try {
			const createdBoard = await postData<BoardResType>(
				'boards/create',
				{ name: data.name },
				BoardResSchema
			)

			if (createdBoard) {
				addBoard(createdBoard)
				onClose()
			}

			console.log(createdBoard)
		} catch {
			alert('Ошибка при создании доски')
		}
	}
	return { register, handleSubmit, errors, submitHandler }
}
