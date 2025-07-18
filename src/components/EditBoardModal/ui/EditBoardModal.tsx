import iconCross from "@/assets/icon-cross.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { BoardResType } from "src/types/types";
import { BoardResSchema } from "src/types/zodShemas";
import { useParams } from "react-router-dom";
import { useActions } from "src/store/useActions";
import { useBoardsState } from "src/store/slices/boardsSlice";
import { updata } from "src/api";

export function EditBoardModal() {
  const navigate = useNavigate();
  const { boardId } = useParams<{ boardId: string }>();
  const { boards } = useBoardsState();
  const currentBoard = boards.find((board) => board.id === Number(boardId));
  const { editBoard } = useActions();
  console.log(currentBoard);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardResType>({
    resolver: zodResolver(BoardResSchema),
    defaultValues: {
      name: currentBoard?.name || "",
      id: Number(boardId),
      user_id: currentBoard?.user_id,
    },
  });

  const onSubmit = async (data: BoardResType) => {
    if (!boardId || !currentBoard) return;

    try {
      const updateData = {
        name: data.name,
      };

      const updatedBoard = await updata(
        `boards/${boardId}/edit`,
        updateData,
        BoardResSchema
      );

      if (updatedBoard) {
        editBoard({
          id: Number(boardId),
          name: data.name,
          user_id: currentBoard.user_id,
        });

        navigate(`/boards/${boardId}`);
      }
    } catch (error) {
      console.error("Failed to update board:", error);
    }
  };

  return (
    <div className="modal-overlay edit-board-modal">
      <div className="modal">
        <div className="modal-header">
          <h2>Edit Board</h2>
          <button className="close-modal">
            <Link to={`/boards/${boardId}`}>
              <img src={iconCross} alt="Close" />
            </Link>
          </button>
        </div>

        <form id="edit-board-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="board-name">Board Name</label>
            <input
              type="text"
              id="board-name"
              placeholder="Tabula rasa"
              {...register("name")}
              className={errors.name ? "error" : ""}
            />
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}
          </div>
          <button type="submit" className="btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
