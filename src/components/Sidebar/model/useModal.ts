import { useEffect, useState } from 'react'

export const useModal = () => {
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
			//ignore
		}
	}, [isOpenModal])

	return { isOpenModal, setIsOpenModal }
}
