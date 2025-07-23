import { NavLink, useLocation, useNavigate } from 'react-router-dom'
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
	const location = useLocation()

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
							<li
								key={board.id}
								className={
									location.pathname === `/boards/${board.id}`
										? 'active dropdown-board'
										: 'dropdown-board'
								}
							>
								<NavLink
									to={`/boards/${board.id}`}
									style={{
										textDecoration: 'none',
										display: 'flex',
										alignItems: 'center',
										gap: '8px',
									}}
									onClick={() => handleSelectBoard(board.id)}
								>
									<img src={boardImg} alt='Board Img' />
									{board.name}
								</NavLink>
							</li>
						))}

						<li
							className='create-board'
							onClick={() => navigate('/boards/create')}
						>
							<img src={iconBoard} alt='' /> + Create New Board
						</li>
					</ul>
				)}
			</div>
		</div>
	)
}
