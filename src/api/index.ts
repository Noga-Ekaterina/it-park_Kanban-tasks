import axios, { AxiosError } from "axios";
import { ZodError, ZodType } from "zod";

export async function getData<T>(
  path: string,
  schema: ZodType<T>, // Используем ZodType<T> вместо any
): Promise<T | undefined> {
  try {
    // Используем unknown для данных перед валидацией
    const response = await axios.get<unknown>(`/api/${path}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJrYXQifQ.FpeWnPeAaGrzcme3NXYXYvqk6vYCOUXmsLHF7_OeJsk",
      },
    });

    // Валидация данных через Zod схему
    return schema.parse(response.data);
  } catch (error) {
    if (error instanceof AxiosError || error instanceof ZodError) {
      console.error("Request failed:", error);
      alert("Ошибка на сервере");
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

export async function updata<D, T>(
  path: string,
  data: D,
  schema: ZodType<T>,
): Promise<T | undefined> {
  try {
    // Используем unknown для данных перед валидацией
    const response = await axios.patch<unknown>(`/api/${path}`, data, {
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJrYXQifQ.FpeWnPeAaGrzcme3NXYXYvqk6vYCOUXmsLHF7_OeJsk",
      },
    });

    // Валидация данных через Zod схему
    return schema.parse(response.data);
  } catch (error) {
    if (error instanceof AxiosError || error instanceof ZodError) {
      console.error("Request failed:", error);
      alert("Ошибка на сервере, не получилось сохранить изменеия");
    } else {
      console.error("Unexpected error:", error);
      alert("Какая-то ошибка, не получилось сохранить изменеия");
    }
  }
}
