import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useActions } from "src/store/useActions";
import { postData } from "../../../api";
import type { BoardResType, BoardType } from "../../../types/types";
import { BoardResSchema, BoardSchema } from "../../../types/zodShemas";
import { useBoardsState } from "../../../store/slices/boardsSlice.ts";
import { useMemo } from "react";

export const useSubmit = () => {
  const { addBoard } = useActions();
  const navigate = useNavigate();
  const { boards } = useBoardsState();

  const dynamicSchema = useMemo(() => {
    return BoardSchema.extend({
      name: BoardSchema.shape.name.refine(
        (value) => !boards.find((board) => board.name === value),
        { message: "Доска с таким названием уже существует" },
      ),
    });
  }, [boards]); // Пересоздаём схему при изменении boards

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardType>({
    resolver: zodResolver(dynamicSchema),
    mode: "onChange",
  });

  const submitHandler = async (data: BoardType) => {
    try {
      const createdBoard = await postData<BoardResType>(
        "boards/create",
        { name: data.name },
        BoardResSchema,
      );

      if (createdBoard) {
        addBoard(createdBoard);

        navigate(`/boards/${createdBoard.id}`, { replace: true });
      }
    } catch {
      alert("Ошибка при создании доски");
    }
  };
  return { register, handleSubmit, errors, submitHandler };
};
