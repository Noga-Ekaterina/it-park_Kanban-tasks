// функции запросов
import axios, { AxiosError } from 'axios'
import { ZodError, ZodType } from 'zod'

export async function getData<T>(
	path: string,
	schema: ZodType<T> // Используем ZodType<T> вместо any
): Promise<T | undefined> {
	try {
		// Используем unknown для данных перед валидацией
		const response = await axios.get<unknown>(`/api/${path}`, {
			headers: {
				Authorization: 'Bearer 280171532d69444293964b51f34fd344',
			},
		})

		// Валидация данных через Zod схему
		return schema.parse(response.data)
	} catch (error) {
		if (error instanceof AxiosError || error instanceof ZodError) {
			console.error('Request failed:', error)
			alert('Ошибка на сервере')
		} else {
			console.error('Unexpected error:', error)
		}
	}
}

// POST запрос для создания доски или других сущностей
export async function postData<TReq, TRes>(
	path: string,
	body: TReq,
	schema: ZodType<TRes>
): Promise<TRes | undefined> {
	try {
		const response = await axios.post<unknown>(
			`https://amogus22877769.work.gd/api/${path}`,
			body,
			{
				headers: {
					Authorization:
						'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJzdHJpbmcifQ.-etkOdnSUjYskkGhEd7ntmsmw8Ld8G9cF5xIwDQ7O7E',
					'Content-Type': 'application/json',
				},
			}
		)
		return schema.parse(response.data)
	} catch (error) {
		if (error instanceof AxiosError || error instanceof ZodError) {
			console.error('Request failed:', error)
			alert('Ошибка на сервере')
		} else {
			console.error('Unexpected error:', error)
		}
	}
}
