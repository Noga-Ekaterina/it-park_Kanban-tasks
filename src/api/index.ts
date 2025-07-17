import axios, { AxiosError } from "axios";
import z, { ZodError, ZodType } from "zod";

export async function getData<T>(
  path: string,
  schema: ZodType<T>, // Используем ZodType<T> вместо any
): Promise<T | undefined> {
  try {
    // Используем unknown для данных перед валидацией
    const response = await axios.get<unknown>(`/api/${path}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJrYXQifQ.q3aQ7uOhBL_B4c4WdfaWrgn7clW5wHD8kqAk9CukovQ",
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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJrYXQifQ.q3aQ7uOhBL_B4c4WdfaWrgn7clW5wHD8kqAk9CukovQ",
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

export async function isUsernameFree(
  username: string,
): Promise<boolean | undefined> {
  try {
    const response = await axios.post<unknown>(
      "/api/check_username",
      { username: username },
      {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
      },
    );
    if (response.status == 200) {
      return false;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 400) {
        return true;
      } else {
        console.error("Request failed:", error);
        alert("Ошибка на сервере, не получилось сохранить изменеия");
      }
    } else {
      console.error("Unexpected error:", error);
      alert("Какая-то ошибка, не получилось сохранить изменеия");
    }
  }
}

export async function signUp(
  username: string,
  password: string,
): Promise<string | undefined> {
  try {
    const response = await axios.post<unknown>(
      "/api/signup",
      { username: username, password: password },
      {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
      },
    );

    return z
      .object({
        token: z.string(),
      })
      .parse(response.data).token;
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

export async function logIn(
  username: string,
  password: string,
): Promise<string | undefined> {
  try {
    const response = await axios.post<unknown>(
      "/api/signin",
      { username: username, password: password },
      {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
      },
    );

    return z
      .object({
        token: z.string(),
      })
      .parse(response.data).token;
  } catch (error) {
    if (error instanceof AxiosError || error instanceof ZodError) {
      if (
        error instanceof AxiosError &&
        (error.status === 400 || error.status === 401)
      ) {
        console.log("SignUp failed");
      } else {
        console.error("Request failed:", error);
        alert("Ошибка на сервере, не получилось сохранить изменеия");
      }
    } else {
      console.error("Unexpected error:", error);
      alert("Какая-то ошибка, не получилось сохранить изменеия");
    }
  }
}
