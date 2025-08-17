import { useBoardsState } from "../../../store/slices/boardsSlice.ts";
import { useParams } from "react-router-dom";

export function Header() {
  const { boards } = useBoardsState();
  const { boardId } = useParams();

  const activeBoard = boards.find((b) => String(b.id) === boardId);

  return (
    <header>
      <div className="header-left">
        <img className="mobile-logo" src="assets/logo-mobile.svg" alt="" />
        {activeBoard && <h1>{activeBoard.name}</h1>}
        <img className="chevron" src="assets/icon-chevron-down.svg" alt="" />
      </div>
      <div className="header-right">
        <button className="btn add-task" disabled={!activeBoard}>
          <img src="assets/icon-add-task-mobile.svg" alt="" />
          <span>Add New Task</span>
        </button>
        <button className="btn-ellipsis" disabled={!activeBoard}>
          <img src="assets/icon-vertical-ellipsis.svg" alt="" />
        </button>
      </div>
    </header>
  );
}
