import { useNavigate, useParams } from "react-router-dom";
import {
  default as boardImg,
  default as iconBoard,
} from "../../../assets/icon-board.svg";
import { useFetchingBoards } from "../model/useFetchingBoards";
import { useBoardsState } from "../../../store/slices/boardsSlice.ts";
import {Loader} from "../../Loader";

export function Boards() {
  const { isLoading, errorMessage } = useFetchingBoards();
  const { boards } = useBoardsState();
  const { boardId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="boards">
      <h3>ALL BOARDS ({boards.length})</h3>

      <div className="boards-content">
        {isLoading ? (
          <Loader />
        ) : errorMessage ? (
          <div className="error">{errorMessage}</div>
        ) : boards.length === 0 ? (
          <div className="board-wrapper">
            <i className="board-text">Добавьте первую доску</i>
            <div
              className="create-board dropdown-board"
              onClick={() => navigate(`/boards/create`)}
            >
              <img src={iconBoard} alt="" /> + Create New Board
            </div>
          </div>
        ) : (
          <ul>
            {boards.map((board) => (
              <li
                key={board.id}
                className={
                  String(board.id) === boardId
                    ? "active dropdown-board"
                    : "dropdown-board"
                }
                onClick={() => {
                  navigate(`/boards/${board.id}`);
                }}
              >
                <img src={boardImg} alt="Board Img" />
                {board.name}
              </li>
            ))}
            <li
              className="create-board"
              onClick={() => navigate(`/boards/create`)}
            >
              <img src={iconBoard} alt="" /> + Create New Board
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
