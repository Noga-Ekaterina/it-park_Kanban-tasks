import iconDark from "@/assets/icon-dark-theme.svg";
import iconlight from "@/assets/icon-light-theme.svg";
import iconSidebar from "@/assets/icon-hide-sidebar.svg";
import { useEffect, useState } from "react";

export function SidebarFooter() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
    () => localStorage.getItem("isDarkTheme") === "true" || false
  );

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkTheme);
    localStorage.setItem("isDarkTheme", JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);

  return (
    <div className="sidebar-footer">
      <div className="theme-toggle">
        <img src={iconlight} alt="Иконка солнца" />
        <label className="switch" htmlFor="themeSwitch">
          <input
            id="themeSwitch"
            type="checkbox"
            checked={isDarkTheme}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setIsDarkTheme(e.target.checked)
            }
          />
          <span className="slider round"></span>
        </label>
        <img src={iconDark} alt="Иконка луны" />
      </div>
      <div className="hide-sidebar">
        <img src={iconSidebar} alt="" />
        <span>Hide Sidebar</span>
      </div>
    </div>
  );
}
