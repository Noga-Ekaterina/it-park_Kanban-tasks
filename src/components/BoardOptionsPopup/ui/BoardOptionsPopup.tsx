import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export function BoardOptionsPopup() {
  const { boardId } = useParams<{ boardId: string }>();
  return (
    <div
      className="popup-overlay"
      id="board-options-popup"
      style={{ padding: "0", top: "80px", right: "20px" }}
    >
      <div className="popup-menu">
        <Link to={`/boards/${boardId}/edit`} style={{ textDecoration: "none" }}>
          <button className="popup-item edit-board-btn">
            <span>Edit Board</span>
          </button>
        </Link>
        <Link
          to={`/boards/${boardId}/delete`}
          style={{ textDecoration: "none" }}
        >
          <button className="popup-item delete-board-btn">
            <span>Delete Board</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
