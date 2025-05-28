export function EditBoardModal() {
  return (
    <div className="modal-overlay edit-board-modal hidden">
      <div className="modal">
        <div className="modal-header">
          <h2>Edit Board</h2>
          <button className="close-modal">
            <img src="assets/icon-cross.svg" alt="Close" />
          </button>
        </div>

        <form id="edit-board-form">
          <div className="form-group">
            <label htmlFor="board-name">Board Name</label>
            <input
              type="text"
              id="board-name"
              value="Platform Launch"
              placeholder="e.g. Web Design"
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
