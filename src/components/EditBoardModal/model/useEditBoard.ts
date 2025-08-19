import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useActions } from "src/store/useActions";
import { updata } from "../../../api/index.ts";
import type { BoardResType, BoardType } from "../../../types/types.ts";
import { BoardResSchema, BoardSchema } from "../../../types/zodShemas.ts";
import { useBoardsState } from "../../../store/slices/boardsSlice.ts";
import { useMemo } from "react";

export const useEditBoard = () => {
  const { editBoard } = useActions();
  const navigate = useNavigate();
  const { boards } = useBoardsState();
  const { boardId } = useParams<{ boardId: string }>();

  // Находим текущую доску для предзаполнения формы
  const currentBoard = useMemo(() => {
    return boards.find((board) => board.id === Number(boardId));
  }, [boards, boardId]);

  const dynamicSchema = useMemo(() => {
    return BoardSchema.extend({
      name: BoardSchema.shape.name.refine(
        (value) => {
          // Разрешаем текущее название доски, но запрещаем дубликаты других досок
          return !boards.find(
            (board) => board.name === value && board.id !== Number(boardId)
          );
        },
        { message: "Доска с таким названием уже существует" }
      ),
    });
  }, [boards, boardId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardType>({
    resolver: zodResolver(dynamicSchema),
    mode: "onChange",
    defaultValues: {
      name: currentBoard?.name || "",
    },
  });

  const submitHandler = async (data: BoardType) => {
    if (!boardId || !currentBoard) return;

    try {
      const updatedBoard = await updata<BoardType, BoardResType>(
        `boards/${boardId}/edit`,
        { name: data.name },
        BoardResSchema
      );

      if (updatedBoard) {
        editBoard(updatedBoard);
        navigate(`/boards/${boardId}`, { replace: true });
      }
    } catch {
      alert("Ошибка при обновлении доски");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    submitHandler,
    currentBoard,
    isEditing: !!currentBoard,
  };
};
