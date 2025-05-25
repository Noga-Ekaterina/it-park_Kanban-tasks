export function Boards() {
    return (
        <div className="boards">
            <h3>ALL BOARDS (3)</h3>
            <ul>
                <li className="active">
                    <img src="assets/icon-board.svg" alt="" />
                    Platform Launch
                </li>
                <li>
                    <img src="assets/icon-board.svg" alt="" />
                    Marketing Plan
                </li>
                <li>
                    <img src="assets/icon-board.svg" alt="" />
                    Roadmap
                </li>
                <li className="create-board">
                    <img src="assets/icon-board.svg" alt="" /> + Create New
                    Board
                </li>
            </ul>
        </div>
    );
}
