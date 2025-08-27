import { useNavigate, useParams } from "react-router-dom";
import { useActions } from "../../../store/useActions.ts";
import { deldata } from "../../../api";
import { TaskSchema } from "../../../types/zodShemas.ts";

export function useDeleteTask() {
  const { boardId, taskId } = useParams();
  const navigate = useNavigate();
  const { deleteTask } = useActions();

  const onDelete = async () => {
    if (!boardId) return;
    try {
      const resp = await deldata(
        `boards/${boardId}/tasks/${taskId}/delete`,
        TaskSchema,
      );
      if (resp) {
        deleteTask({ boardId: String(boardId), id: Number(taskId) });
      }
      navigate(`/boards/${boardId}`);
    } catch {
      console.log("Failed to delete task");
    }
  };

  return onDelete;
}
