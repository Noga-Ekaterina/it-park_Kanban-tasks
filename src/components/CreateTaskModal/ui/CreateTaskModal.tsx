import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import closeIcon from "@/assets/icon-cross.svg";
import { useCreateTask } from "../model/useCreateTask.ts";

export function CreateTaskModal() {
  const navigate = useNavigate();
  const { boardId } = useParams() as { boardId: string };
  const { register, handleSubmit, errors, onSubmit } = useCreateTask();

  return (
    <div className="modal-overlay edit-task-modal">
      <div className="modal edit-task-modal-content">
        <div className="modal-header">
          <h2>Create task</h2>
          <button
            className="close-modal"
            onClick={() => navigate(`/boards/${boardId}`)}
          >
            <img src={closeIcon} alt="Close" />
          </button>
        </div>

        <form id="edit-task-form" onSubmit={handleSubmit(onSubmit)}>
          {/* <!-- Task Title --> */}
          <div className="form-group">
            <label htmlFor="edit-task-title">Title</label>
            <input
              type="text"
              id="edit-task-title"
              placeholder="Enter title"
              {...register("title", { required: true })}
            />
            {
              <p
                style={{
                  color: "var(--red)",
                  fontSize: "0.75",
                  marginTop: "1rem",
                }}
              >
                {errors.title?.message}
              </p>
            }
          </div>

          {/* <!-- Task Description --> */}
          <div className="form-group">
            <label htmlFor="edit-task-description">Description</label>
            <textarea
              id="edit-task-description"
              placeholder="Enter description"
              {...register("description", { required: true })}
            />
            {
              <p
                style={{
                  color: "var(--red)",
                  fontSize: "0.75",
                  marginTop: "1rem",
                }}
              >
                {errors.description?.message}
              </p>
            }
          </div>

          {/* <!-- Status --> */}
          <div className="form-group">
            <label htmlFor="edit-task-status">Status</label>
            <select
              id="edit-task-status"
              {...register("status", { valueAsNumber: true })}
            >
              <option value="0">Todo</option>
              <option value="1">Doing</option>
              <option value="2">Done</option>
            </select>
          </div>
          {
            <div className="form-group">
              <p
                style={{
                  color: "var(--red)",
                  fontSize: "0.75",
                }}
              >
                {errors.status?.message}
              </p>
            </div>
          }
          {/* <!-- Submit Button --> */}
          <button type="submit" className="btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
