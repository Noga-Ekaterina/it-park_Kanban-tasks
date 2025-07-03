import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { pushNewBoard } from 'src/store/slices/boardsSlice'
import type { BoardType } from 'src/types/types'
import { z } from 'zod'
import { BoardSchema } from '../../../types/zodShemas'

interface CreateBoardModalProps {
	onSetIsOpenModal: (value: boolean) => void
}

type BoardFormType = z.infer<typeof BoardSchema>

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

	const submitHandler = (data: BoardFormType) => {
		const newBoard: BoardType = {
			name: data.name,
		}
		dispatch(pushNewBoard(newBoard))
		onSetIsOpenModal(false)
	}
  

	return (
		<div className='modal-overlay board-modal'>
			<div className='modal create-board-modal'>
				<div className='modal-header'>
					<h2>Add New Board</h2>
					<button className='close-modal'>
						<img
							src='assets/icon-cross.svg'
							alt='Close'
							onClick={() => {
                onSetIsOpenModal(false)
              }}
						/>
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
