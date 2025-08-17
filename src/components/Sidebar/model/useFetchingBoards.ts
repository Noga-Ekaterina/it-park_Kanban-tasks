import { useEffect, useState } from "react";
import { useActions } from "src/store/useActions";
import { getData } from "../../../api";
import type { BoardResType } from "../../../types/types";
import { BoardResSchema } from "../../../types/zodShemas";

export const useFetchingBoards = () => {
  const { getBoards } = useActions();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBoards = async () => {
      setIsLoading(true);

      try {
        const cached = localStorage.getItem("boards");
        if (cached) {
          const cachedBoards: BoardResType[] = JSON.parse(cached);
          getBoards(cachedBoards);
        }

        const serverBoards = await getData<BoardResType[]>(
          "boards",
          BoardResSchema.array(),
        );

        if (!serverBoards) {
          setErrorMessage("Ошибка загрузки досок с сервера");
          return;
        }

        getBoards(serverBoards);
        localStorage.setItem("boards", JSON.stringify(serverBoards));
      } catch {
        setErrorMessage("Ошибка загрузки досок с сервера");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoards();
  }, []);

  return { isLoading, errorMessage };
};
