import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import { useParams } from 'react-router-dom'
import { CreateBoard } from 'src/pages/CreateBoard/index.ts'
import { getData } from '../../../api'
import { MainContent } from '../../../components/MainContent'
import { useTasksState } from '../../../store/slices/tasksSlice.ts'
import { useActions } from '../../../store/useActions.ts'
import type { BoardTasksResType } from '../../../types/types.ts'
import { BoardTasksResSchema } from '../../../types/zodShemas.ts'

export function Board() {
	const { boardId } = useParams()
	const { tasks } = useTasksState()
	const { addTasks } = useActions()
	const [isLoad, setIsLoad] = useState(false)

	const location = useLocation()
	const isCreateOpenModal = location.pathname.endsWith('/create')

	useEffect(() => {
		if (!boardId || boardId in tasks) return

		;(async () => {
			setIsLoad(true)
			const data = await getData<BoardTasksResType>(
				`boards/${boardId}`,
				BoardTasksResSchema
			)
			if (data) {
				addTasks({ board: boardId, tasks: data.tasks })
			}
			setIsLoad(false)
		})()
	}, [boardId])

	return (
		<>
			<MainContent isLoad={isLoad} />
			<Outlet />
			{isCreateOpenModal && <CreateBoard />}
		</>
	)
}
