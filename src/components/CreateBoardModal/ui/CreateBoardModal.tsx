import { useNavigate } from 'react-router-dom'
import { default as boardClose } from '../../../assets/icon-cross.svg'
import { useSubmit } from '../model/useSubmit'

export function CreateBoardModal() {
	const { register, handleSubmit, errors, submitHandler, createdBoardId } =
		useSubmit()
	const navigate = useNavigate()

	const closeModal = () => {
		if (createdBoardId) {
			navigate(`/boards/${createdBoardId}`, { replace: true }) // если создана  идём к самой доске
		} else {
			navigate(-1) // если нет и пользователь передумад  просто закрываем модалку
		}
	}
	return (
		<div className='modal-overlay board-modal'>
			<div className='modal create-board-modal'>
				<div className='modal-header'>
					<h2>Add New Board</h2>
					<button className='close-modal'>
						<img src={boardClose} alt='Close' onClick={closeModal} />
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
