import { useState } from "react";
import { useBoardsState } from "../../../store/slices/boardsSlice.ts";
import { useParams } from "react-router-dom";
import iconVerticalEllipsis from "@/assets/icon-vertical-ellipsis.svg";
import { BoardOptionsPopup } from "src/components/BoardOptionsPopup";

export function Header() {
  const { boards } = useBoardsState();
  const { boardId } = useParams();
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

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
        <button
          className="btn-ellipsis"
          onClick={() => setIsOptionsOpen((prev) => !prev)}
          style={{ padding: "0 15px" }}
        >
          <img src={iconVerticalEllipsis} alt="openPopupIcon" />
        </button>
      </div>
      {isOptionsOpen && <BoardOptionsPopup />}
    </header>
  );
}
