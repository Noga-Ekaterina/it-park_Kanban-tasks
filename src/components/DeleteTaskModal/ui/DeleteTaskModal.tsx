import { useNavigate, useParams } from "react-router-dom";
import { deldata } from "src/api";
import { useTasksState } from "src/store/slices/tasksSlice";
import { useActions } from "src/store/useActions";
import { TaskSchema } from "src/types/zodShemas";

export function DeleteTaskModal() {
  const { tasks } = useTasksState();
  const { boardId, taskId } = useParams();
  const task =
    boardId && taskId
      ? tasks[boardId]?.find(({ id }) => String(id) == taskId)
      : null;
  console.log(tasks);
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

  return (
    <div className="modal-overlay delete-modal-task ">
      <div className="modal delete-modal">
        <div>
          <h2 className="delete-header">Delete this task?</h2>
          <p className="delete-content">
            Are you sure you want to delete the {task?.title} task and its
            subtasks? This action cannot be reversed.
          </p>
        </div>
        <div className="delete-modal-btn">
          <button
            type="button"
            className="delete-btn"
            onClick={() => onDelete()}
          >
            Delete
          </button>
          <button
            type="button"
            className="delete-cancel-btn"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
