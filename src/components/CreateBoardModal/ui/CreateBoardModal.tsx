export function CreateBoardModal() {
    return (
        <div className="modal-overlay board-modal hidden">
            <div className="modal create-board-modal">
                <div className="modal-header">
                    <h2>Add New Board</h2>
                    <button className="close-modal">
                        <img src="assets/icon-cross.svg" alt="Close" />
                    </button>
                </div>

                <form id="create-board-form">
                    {/* <!-- Board Name --> */}
                    <div className="form-group">
                        <label htmlFor="board-name">Board Name</label>
                        <input
                            type="text"
                            id="board-name"
                            placeholder="e.g. Web Development"
                            required
                        />
                    </div>

                    {/* <!-- Submit Button --> */}
                    <button type="submit" className="btn-primary">
                        Create New Board
                    </button>
                </form>
            </div>
        </div>
    );
}
