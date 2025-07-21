import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import type { StoreState } from 'src/store'
import { useActions } from 'src/store/useActions'

export const useActiveBoard = () => {
  const { setActiveBoard } = useActions()
  const { boards, activeBoardId } = useSelector(
    (state: StoreState) => state.boards
  )

  useEffect(() => {
    if (boards.length === 0) return

    const savedId = localStorage.getItem('activeBoardId')
    const parsedId = savedId ? Number(savedId) : null
    const exists = boards.some((b) => b.id === parsedId)

    if (parsedId && exists) {
      setActiveBoard(parsedId)
    } else {
      const firstId = boards[0].id
      setActiveBoard(firstId)
      localStorage.setItem('activeBoardId', firstId.toString())
    }
  }, [boards]) 

  const handleSelectBoard = (id: number) => {
    setActiveBoard(id)
    localStorage.setItem('activeBoardId', id.toString())
  }

  return { boards, activeBoardId, handleSelectBoard }
}