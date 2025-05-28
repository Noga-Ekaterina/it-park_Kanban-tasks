export function BoardOptionsPopup() {
  return (
    <div className="popup-overlay hidden" id="board-options-popup">
      <div className="popup-menu">
        <button className="popup-item edit-board-btn">
          <img src="assets/icon-board.svg" alt="Edit" />
          <span>Edit Board</span>
        </button>
        <button className="popup-item delete-board-btn">
          <img src="assets/icon-cross.svg" alt="Delete" />
          <span>Delete Board</span>
        </button>
      </div>
    </div>
  );
}
