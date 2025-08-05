import type { BoardType } from 'src/types/types'
import type { BoardResType } from 'src/types/types'

export const validateBoardForm = (
	data: BoardType,
	boards: BoardResType[],
	setError: (name: 'name', error: { type: string; message: string }) => void
): boolean => {
	const nameTrimmed = data.name.trim()

	const isDuplicate = boards.some(
		(board) => board.name.toLowerCase() === nameTrimmed.toLowerCase()
	)

	if (isDuplicate) {
		setError('name', {
			type: 'manual',
			message: 'This board name already exists',
		})
		return false
	}

	return true
}