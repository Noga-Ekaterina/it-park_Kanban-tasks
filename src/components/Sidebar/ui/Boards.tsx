import { Link, useNavigate } from 'react-router-dom'
import {
	default as boardImg,
	default as iconBoard,
} from '../../../assets/icon-board.svg'
import { useActiveBoard } from '../model/useActiveBoard'
import { useFetchingBoards } from '../model/useFetchingBoards'
import { Loader } from './Loader/ui/Loader'

export function Boards() {
	const { isLoading, errorMessage } = useFetchingBoards()
	const { boards, activeBoardId, handleSelectBoard } = useActiveBoard()
	const navigate = useNavigate()

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
						<div
							className='create-board dropdown-board'
							onClick={() => navigate(`/boards/${activeBoardId}/create`)}
						>
							<img src={iconBoard} alt='' /> + Create New Board
						</div>
					</div>
				) : (
					<ul>
						{boards.map((board) => (
							<Link
								to={`/boards/${board.id}`}
								style={{ textDecoration: 'none' }}
							>
								{' '}
								<li
									key={board.id}
									className={
										board.id === activeBoardId
											? 'active dropdown-board'
											: 'dropdown-board'
									}
									onClick={() => handleSelectBoard(board.id)}
								>
									<img src={boardImg} alt='Board Img' />
									{board.name}
								</li>
							</Link>
						))}
						<li
							className='create-board'
							onClick={() => navigate(`/boards/${activeBoardId}/create`)}
						>
							<img src={iconBoard} alt='' /> + Create New Board
						</li>
					</ul>
				)}
			</div>
		</div>
	)
}
