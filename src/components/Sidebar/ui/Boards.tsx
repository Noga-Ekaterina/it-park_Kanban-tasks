import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CreateBoardModal } from 'src/components/CreateBoardModal'
import type { StoreState } from 'src/store'
import {
	default as boardImg,
	default as iconBoard,
} from '../../../assets/icon-board.svg'
import { useFetchingBoards } from '../model/useFetchingBoards'
import { Loader } from './Loader/ui/Loader'


export function Boards() {
	//модалка открытие и сохранение при обновлении
	const [isOpenModal, setIsOpenModal] = useState(() => {
		try {
			const saved = localStorage.getItem('isOpenModal')
			return saved === 'true'
		} catch {
			return false
		}
	})
	useEffect(() => {
		try {
			localStorage.setItem('isOpenModal', isOpenModal.toString())
		} catch {
			// ignore
		}
	}, [isOpenModal])

	//активная li
	const [activeIndex, setActiveIndex] = useState<number | null>(null)
	//хук из model получение данных ошибки и загрузки
	const { isLoading, errorMessage } = useFetchingBoards()
	const { boards } = useSelector((state: StoreState) => state.boards)

	// useEffect(() => {
	// 	try {
	// 		localStorage.setItem('boards', JSON.stringify(boards))
	// 	} catch {
	// 		// ignore
	// 	}
	// }, [boards])

  

	return (
		<div className='boards'>
			<h3>ALL BOARDS ({boards.length})</h3>

			<div className='boards-content'>
				{isLoading ? (
					<Loader />
				) : errorMessage ? (
					<div className='error'>{errorMessage}</div>
				) : boards.length === 0 ? (
					<div className='board-wrapper'>
						<i className='board-text'>Добавьте первую доску</i>
						<div className='create-board dropdown-board' onClick={() => setIsOpenModal(true)}>
							<img src={iconBoard} alt='' /> + Create New Board
						</div>
					</div>
				) : (
					<ul>
						{boards.map((board, ind) => (
							<li
								key={ind}
								className={activeIndex === ind ? 'active' : 'dropdown-board'}
								onClick={() => setActiveIndex(ind)}
							>
								<img src={boardImg} alt='Board Img' />
								{board.name}
							</li>
						))}
						<li className='create-board' onClick={() => setIsOpenModal(true)}>
							<img src={iconBoard} alt='' /> + Create New Board
						</li>
					</ul>
				)}
			</div>

			{isOpenModal && <CreateBoardModal onSetIsOpenModal={setIsOpenModal} />}
		</div>
	)
}
