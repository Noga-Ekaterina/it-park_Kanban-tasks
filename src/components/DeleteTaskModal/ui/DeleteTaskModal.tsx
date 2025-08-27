import { useNavigate, useParams } from "react-router-dom";
import { useTasksState } from "src/store/slices/tasksSlice";
import { useDeleteTask } from "../model/useDeleteTask.ts";

export function DeleteTaskModal() {
  const { boardId, taskId } = useParams();
  const navigate = useNavigate();
  const { tasks } = useTasksState();
  const task =
    boardId && taskId
      ? tasks[boardId]?.find(({ id }) => String(id) == taskId)
      : null;
  const onDelete = useDeleteTask();

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
