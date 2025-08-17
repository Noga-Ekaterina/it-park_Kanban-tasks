import { useNavigate } from "react-router-dom";
import { default as boardClose } from "../../../assets/icon-cross.svg";
import { useSubmit } from "../model/useSubmit";

export function CreateBoardModal() {
  const { register, handleSubmit, errors, submitHandler } = useSubmit();
  const navigate = useNavigate();

  return (
    <div className="modal-overlay board-modal">
      <div className="modal create-board-modal">
        <div className="modal-header">
          <h2>Add New Board</h2>
          <button className="close-modal" onClick={() => navigate(-1)}>
            <img src={boardClose} alt="Close" />
          </button>
        </div>

        <form id="create-board-form" onSubmit={handleSubmit(submitHandler)}>
          <div className="form-group">
            <label htmlFor="board-name">Board Name</label>
            <p style={{ color: "red", marginBottom: 10 }}>
              {errors.name?.message}
            </p>
            <input
              type="text"
              id="board-name"
              placeholder="e.g. Web Development"
              {...register("name")}
            />
          </div>

          <button type="submit" className="btn-primary">
            Create New Board
          </button>
        </form>
      </div>
    </div>
  );
}
