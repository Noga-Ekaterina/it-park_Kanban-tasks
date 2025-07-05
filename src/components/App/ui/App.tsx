import { useState } from "react";
import { BoardOptionsPopup } from "src/components/BoardOptionsPopup";
import { CreateBoardModal } from "src/components/CreateBoardModal";
import { EditBoardModal } from "src/components/EditBoardModal/inxex";
import { EditTaskModal } from "src/components/EditTaskModal";
import { MainContent } from "src/components/MainContent";
import { ModalOverlay } from "src/components/ModalOverlay";
import { Sidebar } from "src/components/Sidebar";
import { TaskDetailsModal } from "src/components/TaskDetailsModal";

export type ModalState = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type OpenTaskProps = ModalState;

export type EditProps = ModalState;

export function App() {
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  return (
    <>
      <div className="app-container">
        <Sidebar />
        <MainContent isTaskOpen={isTaskOpen} setIsTaskOpen={setIsTaskOpen} />
      </div>
      <ModalOverlay />
      <CreateBoardModal />
      {/* <!-- Card  --> */}
      <TaskDetailsModal
        isTaskOpen={isTaskOpen}
        setIsTaskOpen={setIsTaskOpen}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
      />
      {/* <!-- Card end --> */}
      <EditTaskModal isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen} />
      <BoardOptionsPopup />
      <EditBoardModal />
    </>
  );
}
