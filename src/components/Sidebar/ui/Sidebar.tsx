import { useState } from "react";
import { Boards } from "./Boards";
import { Logo } from "./Logo";
import { SidebarFooter } from "./SidebarFooter";
import openSidebar from "@/assets/icon-show-sidebar.svg";

export function Sidebar() {
  const [isHideSidebar, setIsHideSidebar] = useState<boolean>(false);

  return isHideSidebar ? (
    <div
      className="openSidebar"
      onClick={() => setIsHideSidebar((prev) => !prev)}
    >
      <img src={openSidebar} alt="открыть сайтбар" />
    </div>
  ) : (
    <div className="sidebar">
      {/* Logo не должно быть в сайтбаре */}
      <Logo />
      <Boards />
      <SidebarFooter setIsHideSidebar={setIsHideSidebar} />
    </div>
  );
}
