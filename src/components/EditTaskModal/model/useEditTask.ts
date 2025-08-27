import { useTasksState } from "../../../store/slices/tasksSlice.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useActions } from "../../../store/useActions.ts";
import { useForm } from "react-hook-form";
import type { TaskType } from "../../../types/types.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema } from "../../../types/zodShemas.ts";
import { updata } from "../../../api";

export function useEditTask() {
  const { tasks } = useTasksState();
  const { boardId, taskId } = useParams();
  const task =
    boardId && taskId
      ? tasks[boardId]?.find(({ id }) => String(id) == taskId)
      : null;

  const navigate = useNavigate();
  const { editTask } = useActions();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskType>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      id: Number(taskId),
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || 0,
    },
  });

  const onSubmit = async (data: TaskType) => {
    if (!boardId) return;
    try {
      const updateTask = await updata(
        `boards/${boardId}/tasks/${taskId}/edit`,
        {
          title: data.title,
          description: data.description,
          status: data.status,
        },
        TaskSchema,
      );
      if (updateTask) {
        editTask({
          boardId: boardId,
          id: Number(taskId),
          newTitle: data.title,
          newDescription: data.description,
          newStatus: data.status,
        });
        navigate(-1); // Возвращение назад после сохранения }
      }
    } catch (error) {
      console.log("FAiled to update task", error);
    }
  };

  return { register, handleSubmit, errors, onSubmit };
}
