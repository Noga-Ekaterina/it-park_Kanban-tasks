import { Boards } from "./Boards";
import { Logo } from "./Logo";
import { SidebarFooter } from "./SidebarFooter";

export function Sidebar() {
  return (
    <div className="sidebar">
      <Logo />
      <Boards />
      <SidebarFooter />
    </div>
  );
}
