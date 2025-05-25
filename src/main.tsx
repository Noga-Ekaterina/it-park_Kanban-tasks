import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './pages/Home'
import Board from "./pages/Board";
import CreateBoard from "./pages/CreateBoard";
import EditBoard from "./pages/EditBoard";
import Task from "./pages/Task";
import EditTask from "./pages/EditTask";
import CreateTask from "./pages/CreateTask";

const root = document.getElementById("root");

ReactDOM.createRoot(root as HTMLElement).render(
    <BrowserRouter>
        <Routes>
            <Route path="/"  element={<Home />} />
            <Route path="boards">
                <Route path=":boardId" element={<Board />} />
                <Route path=":boardId/edit" element={<EditBoard />}/>
                <Route path=":boardId/tasks">
                    <Route path=":taskId" element={<Task />} />
                    <Route path=":taskId/edit" element={<EditTask />} />
                    <Route path='create' element={<CreateTask />} />
                </Route>
                <Route path="create" element={<CreateBoard />}/>
            </Route>
        </Routes>
    </BrowserRouter>
)
