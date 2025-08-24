import { useTasksState } from "src/store/slices/tasksSlice";
import close from "../../../assets/icon-cross.svg";
import { useNavigate, useParams } from "react-router-dom";
import { statuses } from "src/components/TaskDetailsModal/ui/TaskDetailsModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActions } from "src/store/useActions";
import { updata } from "src/api";
import type { TaskType } from "src/types/types";
import { TaskSchema } from "src/types/zodShemas";

export function EditTaskModal() {
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
        TaskSchema
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
  return (
    <div className="modal-overlay edit-task-modal">
      <div className="modal edit-task-modal-content">
        <div className="modal-header">
          <h2>Edit Task</h2>
          <button className="close-modal">
            <img src={close} alt="Close" onClick={() => navigate(-2)} />
          </button>
        </div>

        <form id="edit-task-form" onSubmit={handleSubmit(onSubmit)}>
          {/* <!-- Task Title --> */}
          <div className="form-group">
            <label htmlFor="edittask-title">Title</label>
            <input type="text" id="edit-task-title" {...register("title")} />
            {errors.title && <p className="error">{errors.title.message}</p>}
          </div>

          {/* <!-- Task Description --> */}
          <div className="form-group">
            <label htmlFor="edit-task-description">Description</label>
            <textarea
              id="edit-task-description"
              {...register("description")}
            ></textarea>
            {errors.description && (
              <p className="error">{errors.description.message}</p>
            )}
          </div>

          {/* <!-- Status --> */}
          <div className="form-group">
            <label htmlFor="edit-task-status">Status</label>
            <select
              id="edit-task-status"
              {...register("status", { valueAsNumber: true })}
            >
              {statuses.map((status, index) => (
                <option key={status} value={index}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* <!-- Submit Button --> */}
          <button type="submit" className="btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
