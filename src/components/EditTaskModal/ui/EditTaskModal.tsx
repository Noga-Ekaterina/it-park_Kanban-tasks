import close from "../../../assets/icon-cross.svg";
import { useNavigate } from "react-router-dom";
import { statuses } from "src/components/TaskDetailsModal/ui/TaskDetailsModal";
import { useEditTask } from "../model/useEditTask.ts";

export function EditTaskModal() {
  const navigate = useNavigate();
  const { register, handleSubmit, errors, onSubmit } = useEditTask();

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
