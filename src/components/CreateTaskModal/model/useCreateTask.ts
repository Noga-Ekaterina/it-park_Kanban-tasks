import { useActions } from "../../../store/useActions.ts";
import { useTasksState } from "../../../store/slices/tasksSlice.ts";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { TaskResType, TaskUiType } from "../../../types/types.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskResSchema, TaskUiSchema } from "../../../types/zodShemas.ts";
import { postData } from "../../../api";

export function useCreateTask() {
  const { addTasks } = useActions();
  const { tasks } = useTasksState();
  const navigate = useNavigate();
  const { boardId } = useParams() as { boardId: string };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TaskUiType>({
    resolver: zodResolver(TaskUiSchema),
  });

  async function onSubmit(data: TaskUiType): Promise<void> {
    const response: TaskResType | undefined = await postData<
      TaskResType,
      TaskUiType
    >(`boards/${boardId}/tasks/create`, TaskResSchema, data);
    if (typeof response !== "undefined") {
      addTasks({
        board: boardId,
        tasks: [...tasks[boardId], response],
      });
      navigate(`/boards/${boardId}`);
    } else {
      setError("status", {
        message: "Failed to create task. Try again later.",
      });
    }
  }

  return { register, handleSubmit, errors, onSubmit };
}
