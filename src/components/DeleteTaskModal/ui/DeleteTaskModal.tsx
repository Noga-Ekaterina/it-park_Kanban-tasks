import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasksState } from "src/store/slices/tasksSlice";

export const DeleteTaskModal = () => {
  const { tasks } = useTasksState();
  const { boardId, taskId } = useParams();
  const task =
    boardId && taskId
      ? tasks[boardId]?.find(({ id }) => String(id) == taskId)
      : null;

  const navigate = useNavigate();
  return (
    <div className="modal-overlay delete-modal-task ">
      <div className="modal delete-modal">
        <div>
          <h2 className="delete-header">Delete this task?</h2>
          <p className="delete-content">
            Are you sure you want to delete the 'TASK TITLE' task and its
            subtasks? This action cannot be reversed.
          </p>
        </div>
        <div className="delete-modal-btn">
          <button type="button" className="delete-btn">
            Delete
          </button>
          <button type="button" className="delete-cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
