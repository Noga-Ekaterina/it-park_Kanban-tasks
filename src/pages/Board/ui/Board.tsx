import { Outlet } from "react-router";
import { MainContent } from "../../../components/MainContent";
import { useActions } from "../../../store/useActions.ts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData } from "../../../api";
import { BoardTasksResSchema } from "../../../types/zodShemas.ts";
import type { BoardTasksResType } from "../../../types/types.ts";
import { useTasksState } from "../../../store/slices/tasksSlice.ts";

export function Board() {
  const { boardId } = useParams();
  const { tasks } = useTasksState();
  const { addTasks } = useActions();
  const [isLoad, setIsLoad] = useState(false);

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
      }
      setIsLoad(false);
    })();
  }, [boardId]);

  return (
    <>
      <MainContent isLoad={isLoad} />
      <Outlet />
    </>
  );
}
