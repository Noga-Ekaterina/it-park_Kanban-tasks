import { Header } from "./Header";

export function MainContent() {
    return (
        <div className="main-content">
            <Header />

            {/* <!-- Kanban Board --> */}
            <div className="kanban-board">
                {/* <!-- Todo Column --> */}
                <div className="column">
                    <div className="column-header">
                        <span
                            className="bullet"
                            style={{ background: "#49C4E5" }}
                        ></span>
                        <h3>TODO (4)</h3>
                    </div>
                    <div className="tasks">
                        <div className="task">
                            <h4>Build UI for onboarding flow</h4>
                        </div>
                        <div className="task">
                            <h4>Build UI for search</h4>
                        </div>
                        <div className="task">
                            <h4>Build settings UI</h4>
                        </div>
                        <div className="task">
                            <h4>QA and test all major user journeys</h4>
                        </div>
                    </div>
                </div>

                {/* <!-- Doing Column --> */}
                <div className="column">
                    <div className="column-header">
                        <span
                            className="bullet"
                            style={{ background: "#8471F2;" }}
                        ></span>
                        <h3>DOING (3)</h3>
                    </div>
                    <div className="tasks">
                        <div className="task">
                            <h4>Design settings and search pages</h4>
                        </div>
                        <div className="task">
                            <h4>Add account management endpoints</h4>
                        </div>
                        <div className="task">
                            <h4>Design onboarding flow</h4>
                        </div>
                    </div>
                </div>

                {/* <!-- Done Column --> */}
                <div className="column">
                    <div className="column-header">
                        <span
                            className="bullet"
                            style={{ background: "#67E2AE;" }}
                        ></span>
                        <h3>DONE (2)</h3>
                    </div>
                    <div className="tasks">
                        <div className="task">
                            <h4>Conduct 5 wireframe tests</h4>
                        </div>
                        <div className="task">
                            <h4>Create wireframe prototype</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
