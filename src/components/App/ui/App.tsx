import { BoardOptionsPopup } from "src/components/BoardOptionsPopup";
import { CreateBoardModal } from "src/components/CreateBoardModal";
import { EditBoardModal } from "src/components/EditBoardModal/inxex";
import { EditTaskModal } from "src/components/EditTaskModal";
import { MainContent } from "src/components/MainContent";
import { ModalOverlay } from "src/components/ModalOverlay";
import { Sidebar } from "src/components/Sidebar";
import { TaskDetailsModal } from "src/components/TaskDetailsModal";

export function App() {
    return (
        <>
            {/* <div className="app-container"> */}
                {/* <Sidebar />
                <MainContent /> */}
            {/* </div> */}
            <ModalOverlay />
            {/* <CreateBoardModal /> */}
            {/* <!-- Card  --> */}
            {/* <TaskDetailsModal /> */}
            {/* <!-- Card end --> */}
            {/* <EditTaskModal /> */}
            {/* <BoardOptionsPopup /> */}
            {/* <EditBoardModal /> */}
        </>
    );
}
