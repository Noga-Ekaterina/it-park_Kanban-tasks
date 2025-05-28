export function Header() {
  return (
    <header>
      <div className="header-left">
        <img className="mobile-logo" src="assets/logo-mobile.svg" alt="" />
        <h1>Platform Launch</h1>
        <img className="chevron" src="assets/icon-chevron-down.svg" alt="" />
      </div>
      <div className="header-right">
        <button className="btn add-task">
          <img src="assets/icon-add-task-mobile.svg" alt="" />
          <span>Add New Task</span>
        </button>
        <button className="btn-ellipsis">
          <img src="assets/icon-vertical-ellipsis.svg" alt="" />
        </button>
      </div>
    </header>
  );
}
