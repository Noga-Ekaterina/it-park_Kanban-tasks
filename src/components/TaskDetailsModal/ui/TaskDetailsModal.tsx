import menuIcon from "@/assets/icon-vertical-ellipsis.svg";
import closeIcon from "@/assets/icon-cross.svg";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasksState } from "../../../store/slices/tasksSlice.ts";

const statuses = ["TODO", "DOING", "DONE"];

export function TaskDetailsModal() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const { tasks } = useTasksState();
  const { boardId, taskId } = useParams();
  const task =
    boardId && taskId
      ? tasks[boardId]?.find(({ id }) => String(id) == taskId)
      : null;

  const navigate = useNavigate();

  return (
    <div className="modal-overlay task-modal">
      <div className="modal task-details-modal">
        <div className="modal-header">
          <h2 className="task-title">
            {task ? task.title : "Задачи не существует"}
          </h2>
          <div className="task-actions">
            {task && (
              <button
                className="btn-ellipsis task-menu-btn"
                onClick={() => setIsOpenMenu((prevState) => !prevState)}
              >
                <img src={menuIcon} alt="Actions" />
              </button>
            )}
            <div className={`task-menu ${!isOpenMenu ? "hidden" : ""}`}>
              <button className="edit-task" onClick={() => navigate("edit")}>
                Edit Task
              </button>
              <button className="delete-task">Delete Task</button>
            </div>
          </div>
          <button className="close-modal" onClick={() => navigate(-1)}>
            <img src={closeIcon} alt="Close" />
          </button>
        </div>

        {task && (
          <div className="task-content">
            <p className="task-description">{task.description}</p>

            <div className="task-status">
              <label>Current Status</label>
              <p>{statuses[task.status]}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
