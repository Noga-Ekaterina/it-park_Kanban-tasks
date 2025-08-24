import { useEffect, useState } from "react";
import { useActions } from "src/store/useActions";
import { getData } from "../../../api";
import { useTasksState } from "../../../store/slices/tasksSlice.ts";
import type { BoardTasksResType } from "../../../types/types.ts";
import { BoardTasksResSchema } from "../../../types/zodShemas.ts";
import { useParams } from "react-router-dom";

export const useFetchingTasks = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { boardId } = useParams();
  const { tasks } = useTasksState();
  const { addTasks } = useActions();
  const [isLoad, setIsLoad] = useState(false);

  // const location = useLocation();
  // const isCreateOpenModal = location.pathname.endsWith("/create");

  useEffect(() => {
    if (!boardId || boardId in tasks) return;
    (async () => {
      setIsLoad(true);
      const data = await getData<BoardTasksResType>(
        `boards/${boardId}`,
        BoardTasksResSchema,
      );
      if (data) {
        addTasks({ board: boardId, tasks: data.tasks });
      } else {
        setErrorMessage("Ошибка загрузки задач с сервера");
      }
      setIsLoad(false);
    })();
  }, [boardId]);

  return { isLoad, errorMessage };
};
