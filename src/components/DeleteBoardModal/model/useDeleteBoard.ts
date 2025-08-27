import { useNavigate, useParams } from "react-router-dom";
import { useBoardsState } from "../../../store/slices/boardsSlice.ts";
import { useActions } from "../../../store/useActions.ts";
import { deldata } from "../../../api";
import { BoardResSchema } from "../../../types/zodShemas.ts";

export function useDeleteBoard() {
  const navigate = useNavigate();
  const { boardId } = useParams<{ boardId: string }>();
  const { boards } = useBoardsState();
  const { deleteBoard } = useActions();

  const currentBoard = boards.find((board) => board.id === Number(boardId));

  const handleDelete = async () => {
    if (!boardId || !currentBoard) return;

    try {
      const response = await deldata(
        `boards/${boardId}/delete`,
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

  return { currentBoard, handleDelete };
}
