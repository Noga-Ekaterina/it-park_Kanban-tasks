import actions from "../../../assets/icon-vertical-ellipsis.svg";
import close from "../../../assets/icon-cross.svg";
import { useState } from "react";
// type OpenTaskProps = {
//   isTaskOpen: boolean;
//   setIsTaskOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   isEditOpen: boolean;
//   setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
// };
export function TaskDetailsModal({
  isTaskOpen,
  setIsTaskOpen,
  setIsEditOpen,
  isEditOpen,
}: {
  isTaskOpen: boolean;
  setIsTaskOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditOpen: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const handlerTaskOpen = (bol: boolean) => {
    setIsTaskOpen(bol);
  };
  // console.log(isTaskOpen);
  return (
    <div
      className={
        isTaskOpen
          ? "modal-overlay task-modal"
          : "modal-overlay task-modal hidden"
      }
    >
      <div className="modal task-details-modal">
        <div className="modal-header">
          <h2 className="task-title">Build UI for onboarding flow</h2>
          <div className="task-actions">
            <button
              className="btn-ellipsis task-menu-btn"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <img src={actions} alt="Actions" />
            </button>
            <div className={isOpen ? "task-menu" : "task-menu hidden"}>
              <button
                className="edit-task"
                onClick={() => (
                  setIsEditOpen((prev) => !prev), console.log(isEditOpen)
                )}
              >
                Edit Task
              </button>
              <button className="delete-task">Delete Task</button>
            </div>
          </div>
          <button
            className="close-modal"
            onClick={() => (handlerTaskOpen(!isTaskOpen), setIsOpen(false))}
          >
            <img src={close} alt="Close" />
          </button>
        </div>

        <div className="task-content">
          <p className="task-description">
            This task involves creating all UI components for the new user
            onboarding process including welcome screens, tutorial steps, and
            account setup forms.
          </p>

          <div className="form-group">
            <label htmlFor="task-status">Curent Status</label>
            <select id="task-status">
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
