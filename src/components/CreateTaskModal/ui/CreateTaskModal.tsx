import * as React from "react";
import { postData } from "../../../api";
import type { TaskResType, TaskUiType } from "../../../types/types.ts";
import { TaskResSchema } from "../../../types/zodShemas.ts";
import { useActions } from "../../../store/useActions.ts";
import { useNavigate } from "react-router";
import { useTasksState } from "../../../store/slices/tasksSlice.ts";
import { useParams } from "react-router-dom";
import closeIcon from "@/assets/icon-cross.svg";

const Status = {
  todo: 0,
  doing: 1,
  done: 2,
} as const;

type StatusString = keyof typeof Status;

export function CreateTaskModal() {
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [status, setStatus] = React.useState<StatusString>("doing");
  const { addTasks } = useActions();
  const { tasks } = useTasksState();
  const navigate = useNavigate();
  const { boardId } = useParams() as { boardId: string };

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

        <form
          id="edit-task-form"
          onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const response: TaskResType | undefined = await postData<
              TaskResType,
              TaskUiType
            >(`boards/${boardId}/tasks/create`, TaskResSchema, {
              title: title,
              description: description,
              status: Status[status],
            });
            if (typeof response !== "undefined") {
              addTasks({
                board: boardId,
                tasks: [...tasks[boardId], response],
              });
              navigate(`/boards/${boardId}`);
            } else {
              alert("Error creating task. Try again later.");
            }
          }}
        >
          {/* <!-- Task Title --> */}
          <div className="form-group">
            <label htmlFor="edit-task-title">Title</label>
            <input
              type="text"
              id="edit-task-title"
              placeholder="Enter title"
              required
              value={title}
              onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(event.target.value);
              }}
            />
          </div>

          {/* <!-- Task Description --> */}
          <div className="form-group">
            <label htmlFor="edit-task-description">Description</label>
            <textarea
              id="edit-task-description"
              placeholder="Enter description"
              required
              value={description}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                setDescription(event.target.value);
              }}
            />
          </div>

          {/* <!-- Status --> */}
          <div className="form-group">
            <label htmlFor="edit-task-status">Status</label>
            <select
              id="edit-task-status"
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                setStatus(event.target.value as StatusString);
              }}
              value={status}
            >
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
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
