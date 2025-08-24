import { Outlet } from "react-router-dom";
import { MainContent } from "../../../components/MainContent";

export function Board() {
  return (
    <>
      <MainContent />
      <Outlet />
    </>
  );
}
