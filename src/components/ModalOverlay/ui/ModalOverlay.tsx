export function ModalOverlay() {
    return (
        <div className="modal-overlay hidden">
            {/* <!-- Add Task Modal --> */}
            <div className="modal add-task-modal">
                <div className="modal-header">
                    <h2>Add New Task</h2>
                    <button className="close-modal">
                        <img src="assets/icon-cross.svg" alt="Close" />
                    </button>
                </div>

                <form id="add-task-form">
                    {/* <!-- Task Title --> */}
                    <div className="form-group">
                        <label htmlFor="task-title">Title</label>
                        <input
                            type="text"
                            id="task-title"
                            placeholder="e.g. Take coffee break"
                            required
                        />
                    </div>

                    {/* <!-- Task Description --> */}
                    <div className="form-group">
                        <label htmlFor="task-description">Description</label>
                        <textarea
                            id="task-description"
                            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                        ></textarea>
                    </div>

                    {/* <!-- Status --> */}
                    <div className="form-group">
                        <label htmlFor="task-status">Status</label>
                        <select id="task-status">
                            <option value="todo">Todo</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                        </select>
                    </div>

                    {/* <!-- Submit Button --> */}
                    <button type="submit" className="btn-primary">
                        Create Task
                    </button>
                </form>
            </div>
        </div>
    );
}
