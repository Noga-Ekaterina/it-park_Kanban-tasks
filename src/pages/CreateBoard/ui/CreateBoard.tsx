import { useNavigate } from 'react-router-dom'
import { CreateBoardModal } from '../../../components/CreateBoardModal'

export function CreateBoard() {
	const navigate = useNavigate()

	const handleClose = () => {
		navigate(-1)
	}

	return <CreateBoardModal onClose={handleClose} />
}
