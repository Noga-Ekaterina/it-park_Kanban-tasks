export function TaskDetailsModal() {
    return (
        <div className="modal-overlay task-modal hidden">
            <div className="modal task-details-modal">
                <div className="modal-header">
                    <h2 className="task-title">Build UI for onboarding flow</h2>
                    <div className="task-actions">
                        <button className="btn-ellipsis task-menu-btn">
                            <img
                                src="assets/icon-vertical-ellipsis.svg"
                                alt="Actions"
                            />
                        </button>
                        <div className="task-menu hidden">
                            <button className="edit-task">Edit Task</button>
                            <button className="delete-task">Delete Task</button>
                        </div>
                    </div>
                    <button className="close-modal">
                        <img src="assets/icon-cross.svg" alt="Close" />
                    </button>
                </div>

                <div className="task-content">
                    <p className="task-description">
                        This task involves creating all UI components for the
                        new user onboarding process including welcome screens,
                        tutorial steps, and account setup forms.
                    </p>

                    <div className="task-status">
                        <label>Current Status</label>
                        <p>Done</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
