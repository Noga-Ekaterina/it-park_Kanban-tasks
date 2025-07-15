const tempData = {
  boards: [
    {
      id: "1",
      name: "Platform Launch",
    },
    {
      id: "2",
      name: "Platform Design",
    },
    {
      id: "3",
      name: "Platform Frontend Features",
    },
    {
      id: "4",
      name: "Platform Backend Features",
    },
  ],
  tasks: [
    {
      id: "1",
      title: "Build UI",
      description: "Create components",
      status: 0, // 0 – Todo, 1 – Doing, 2 – Done
      boardId: "1",
    },
  ],
};

export function EditBoardModal() {
  return (
    <div className="modal-overlay edit-board-modal">
      <div className="modal">
        <div className="modal-header">
          <h2>Edit Board</h2>
          <button className="close-modal">
            <img src="../../../assets/icon-cross.svg" alt="Close" />
          </button>
        </div>

        <form id="edit-board-form">
          <div className="form-group">
            <label htmlFor="board-name">Board Name</label>
            <input
              type="text"
              id="board-name"
              defaultValue="Platform Launch"
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
