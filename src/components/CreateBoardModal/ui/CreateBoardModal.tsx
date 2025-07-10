import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { pushNewBoard } from 'src/store/slices/boardsSlice'
import { postData } from '../../../api'
import type { BoardFormType, BoardResType } from '../../../types/types'
import { BoardResSchema, BoardSchema } from '../../../types/zodShemas'

interface CreateBoardModalProps {
	onSetIsOpenModal: (value: boolean) => void
}

export function CreateBoardModal({ onSetIsOpenModal }: CreateBoardModalProps) {
	const dispatch = useDispatch()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<BoardFormType>({
		resolver: zodResolver(BoardSchema),
		mode: 'onChange',
	})

	const submitHandler = async (data: BoardFormType) => {
		try {
			const createdBoard = await postData<BoardFormType, BoardResType>(
				'boards',
				{ name: data.name },
				BoardResSchema
			)

			if (createdBoard) {
				dispatch(pushNewBoard(createdBoard))
				onSetIsOpenModal(false)
			}
		} catch {
			alert('Ошибка при создании доски')
		}
	}

	return (
		<div className='modal-overlay board-modal'>
			<div className='modal create-board-modal'>
				<div className='modal-header'>
					<h2>Add New Board</h2>
					<button
						className='close-modal'
						onClick={() => onSetIsOpenModal(false)}
					>
						<img src='assets/icon-cross.svg' alt='Close' />
					</button>
				</div>

				<form id='create-board-form' onSubmit={handleSubmit(submitHandler)}>
					<div className='form-group'>
						<label htmlFor='board-name'>Board Name</label>
						<p style={{ color: 'red', marginBottom: 10 }}>
							{errors.name?.message}
						</p>
						<input
							type='text'
							id='board-name'
							placeholder='e.g. Web Development'
							{...register('name')}
						/>
					</div>

					<button type='submit' className='btn-primary'>
						Create New Board
					</button>
				</form>
			</div>
		</div>
	)
}
