export function SidebarFooter() {
  return (
    // тест

    <div className="sidebar-footer">
      <div className="theme-toggle">
        <img src="assets/icon-light-theme.svg" alt="" />
        <label className="switch">
          <input type="checkbox" />

          <span className="slider round"></span>
        </label>
        <img src="assets/icon-dark-theme.svg" alt="" />
      </div>
      <div className="hide-sidebar">
        <img src="assets/icon-hide-sidebar.svg" alt="" />
        <span>Hide Sidebar</span>
      </div>
    </div>
  );
}
