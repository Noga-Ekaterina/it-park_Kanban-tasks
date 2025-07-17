import { useTasksState } from "src/store/slices/tasksSlice";
import close from "../../../assets/icon-cross.svg";
import { useNavigate, useParams } from "react-router-dom";
import { statuses } from "src/components/TaskDetailsModal/ui/TaskDetailsModal";

export function EditTask() {
  console.log(1);
  const { tasks } = useTasksState();
  const { boardId, taskId } = useParams();
  const task =
    boardId && taskId
      ? tasks[boardId]?.find(({ id }) => String(id) == taskId)
      : null;

  const navigate = useNavigate();
  return (
    <div className={"modal-overlay edit-task-modal"}>
      <div className="modal edit-task-modal-content">
        <div className="modal-header">
          <h2>Edit Task</h2>
          <button className="close-modal">
            <img src={close} alt="Close" onClick={() => navigate(-2)} />
          </button>
        </div>

        <form id="edit-task-form">
          {/* <!-- Task Title --> */}
          <div className="form-group">
            <label htmlFor="edittask-title">Title</label>
            <input
              type="text"
              id="edit-task-title"
              value={task ? task.title : ""}
              required
            />
          </div>

          {/* <!-- Task Description --> */}
          <div className="form-group">
            <label htmlFor="edit-task-description">Description</label>
            <textarea id="edit-task-description">{task?.description}</textarea>
          </div>

          {/* <!-- Status --> */}
          <div className="form-group">
            <label htmlFor="edit-task-status">Status</label>
            <select id="edit-task-status">
              {statuses.map((status) =>
                status == statuses[task.status] ? (
                  <option value={status} selected>
                    {status}
                  </option>
                ) : (
                  <option value={status}>{status}</option>
                )
              )}
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
