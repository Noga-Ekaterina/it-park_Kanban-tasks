import { useState } from "react";
import { Header } from "./Header";
import Column from "./Column.tsx";

interface IProps {
  isLoad: boolean;
}

export function MainContent({ isLoad }: IProps) {
  return (
    <div className="main-content">
      <Header />

      {/* <!-- Kanban Board --> */}

      {isLoad ? (
        <h2 style={{ marginTop: "40px", textAlign: "center" }}>Загрузка...</h2>
      ) : (
        <div className="kanban-board">
          {/* <!-- Todo Column --> */}
          <Column tasksStatus={0} title={"TODO"} background={"#49C4E5"} />

          {/* <!-- Doing Column --> */}
          <Column tasksStatus={1} title={"DOING"} background={"#8471F2"} />

          {/* <!-- Done Column --> */}
          <Column tasksStatus={2} title={"DONE"} background={"#67E2AE"} />
        </div>
      )}
    </div>
  );
}
