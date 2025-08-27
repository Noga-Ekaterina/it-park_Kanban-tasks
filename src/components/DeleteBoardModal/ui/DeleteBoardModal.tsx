import iconCross from "@/assets/icon-cross.svg";
import { useNavigate } from "react-router-dom";
import { useDeleteBoard } from "../model/useDeleteBoard.ts";

export function DeleteBoardModal() {
  const navigate = useNavigate();
  const { currentBoard, handleDelete } = useDeleteBoard();

  return (
    <div className="modal-overlay edit-board-modal">
      <div className="modal">
        <div className="modal-header">
          <h2>
            Delete <i>{currentBoard?.name}</i> Board
          </h2>
          <button className="close-modal" onClick={() => navigate(-1)}>
            <img src={iconCross} alt="Close" />
          </button>
        </div>

        <div className="delete-confirmation">
          <p>Are you sure you want to delete board "{currentBoard?.name}"?</p>

          <div
            className="buttons-group"
            style={{ display: "flex", gap: "15px", marginTop: "20px" }}
          >
            <button className="btn-secondary" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button
              className="btn-primary"
              style={{ backgroundColor: "red" }}
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
