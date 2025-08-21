import { useNavigate } from "react-router-dom";
import { default as boardClose } from "../../../assets/icon-cross.svg";
import { useEditBoard } from "../model/useEditBoard";

export function EditBoardModal() {
  const { register, handleSubmit, errors, submitHandler, isEditing } =
    useEditBoard();
  const navigate = useNavigate();

  if (!isEditing) {
    return (
      <div className="modal-overlay board-modal">
        <div className="modal edit-board-modal">
          <div className="modal-header">
            <h2>Доска не найдена</h2>
            <button className="close-modal" onClick={() => navigate(-1)}>
              <img src={boardClose} alt="Close" />
            </button>
          </div>
          <p>Не удалось найти доску для редактирования.</p>
          <button onClick={() => navigate(-1)} className="btn-primary">
            Назад
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay board-modal">
      <div className="modal edit-board-modal">
        <div className="modal-header">
          <h2>Редактировать доску</h2>
          <button className="close-modal" onClick={() => navigate(-1)}>
            <img src={boardClose} alt="Close" />
          </button>
        </div>

        <form id="edit-board-form" onSubmit={handleSubmit(submitHandler)}>
          <div className="form-group">
            <label htmlFor="board-name">Название доски</label>
            <p style={{ color: "red", marginBottom: 10 }}>
              {errors.name?.message}
            </p>
            <input
              type="text"
              id="board-name"
              placeholder="Tabula Rasa"
              {...register("name")}
            />
          </div>

          <div className="modal-buttons">
            <button type="submit" className="btn-primary">
              Сохранить изменения
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-secondary"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
