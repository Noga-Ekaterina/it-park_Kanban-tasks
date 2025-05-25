export function EditTaskModal() {
    return (
        <div className="modal-overlay edit-task-modal hidden">
            <div className="modal edit-task-modal-content">
                <div className="modal-header">
                    <h2>Edit Task</h2>
                    <button className="close-modal">
                        <img src="assets/icon-cross.svg" alt="Close" />
                    </button>
                </div>

                <form id="edit-task-form">
                    {/* <!-- Task Title --> */}
                    <div className="form-group">
                        <label htmlFor="edit-task-title">Title</label>
                        <input
                            type="text"
                            id="edit-task-title"
                            value="Build UI for onboarding flow"
                            required
                        />
                    </div>

                    {/* <!-- Task Description --> */}
                    <div className="form-group">
                        <label htmlFor="edit-task-description">
                            Description
                        </label>
                        <textarea id="edit-task-description">
                            This task involves creating all UI components for
                            the new user onboarding process including welcome
                            screens, tutorial steps, and account setup forms.
                        </textarea>
                    </div>

                    {/* <!-- Status --> */}
                    <div className="form-group">
                        <label htmlFor="edit-task-status">Status</label>
                        <select id="edit-task-status">
                            <option value="todo">Todo</option>
                            <option value="doing" selected>
                                Doing
                            </option>
                            <option value="done">Done</option>
                        </select>
                    </div>

                    {/* <!-- Submit Button --> */}
                    <button type="submit" className="btn-primary">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}
