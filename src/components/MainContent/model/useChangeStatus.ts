import type { TaskType } from "../../../types/types.ts";
import { useActions } from "../../../store/useActions.ts";
import { updata } from "../../../api";
import { TaskResSchema } from "../../../types/zodShemas.ts";

export function useChangeStatus() {
  const { changeTaskStatus } = useActions();

  return (board: string, id: TaskType["id"], newStatus: TaskType["status"]) => {
    changeTaskStatus({ board, id, newStatus });

    updata(
      `boards/${board}/tasks/${id}/edit`,
      { status: newStatus },
      TaskResSchema,
    );
  };
}
