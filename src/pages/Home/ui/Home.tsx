import { Outlet, useNavigate } from "react-router";
import { Sidebar } from "../../../components/Sidebar";
import { useEffect } from "react";

export function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/logIn");
    }
  }, []);
  return (
    <>
      <div className="app-container">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}
