import iconCross from "@/assets/icon-cross.svg";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useActions } from "src/store/useActions";
import { useBoardsState } from "src/store/slices/boardsSlice";
import { updata } from "src/api";
import { BoardResSchema } from "src/types/zodShemas";

export function DeleteBoardModal() {
  const navigate = useNavigate();
  const { boardId } = useParams<{ boardId: string }>();
  const { boards } = useBoardsState();
  const { deleteBoard } = useActions();

  const currentBoard = boards.find((board) => board.id === Number(boardId));

  const handleDelete = async () => {
    if (!boardId || !currentBoard) return;

    try {
      const response = await updata(
        `boards/${boardId}/delete`,
        {},
        BoardResSchema,
      );

      if (response) {
        deleteBoard(Number(boardId));
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to delete board:", error);
    }
  };

  return (
    <div className="modal-overlay edit-board-modal">
      <div className="modal">
        <div className="modal-header">
          <h2>
            Delete <i>{currentBoard?.name}</i> Board
          </h2>
          <button className="close-modal">
            <Link to={`/boards/${boardId}`}>
              <img src={iconCross} alt="Close" />
            </Link>
          </button>
        </div>

        <div className="delete-confirmation">
          <p>Are you sure you want to delete board "{currentBoard?.name}"?</p>

          <div
            className="buttons-group"
            style={{ display: "flex", gap: "15px", marginTop: "20px" }}
          >
            <button
              className="btn-secondary"
              onClick={() => navigate(`/boards/${boardId}`)}
            >
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
