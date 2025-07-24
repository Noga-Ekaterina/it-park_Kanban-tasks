import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Board } from './pages/Board'
import { CreateBoard } from './pages/CreateBoard'
import { CreateTask } from './pages/CreateTask'
import { EditBoard } from './pages/EditBoard'
import { EditTask } from './pages/EditTask'
import { Home } from './pages/Home'
import { LogIn } from './pages/LogIn'
import { SignUp } from './pages/SignUp'
import { Task } from './pages/Task'
import { store } from './store'
import './styles/index.css'

const root = document.getElementById('root')

ReactDOM.createRoot(root as HTMLElement).render(
	<BrowserRouter>
		<Provider store={store}>
			<DndProvider backend={HTML5Backend}>
				<Routes>
					<Route path='logIn' element={<LogIn />} />
					<Route path='signUp' element={<SignUp />} />
					<Route path='/' element={<Home />}>
						<Route path='boards'>
							<Route path='create' element={<CreateBoard />} />
							<Route path=':boardId' element={<Board />}>
								<Route path='edit' element={<EditBoard />} />
								<Route path='tasks'>
									<Route path='create' element={<CreateTask />} />
									<Route path=':taskId' element={<Task />} />
									<Route path=':taskId/edit' element={<EditTask />} />
								</Route>
							</Route>
						</Route>
					</Route>
					<Route path='*' element={<Home />} />
				</Routes>
			</DndProvider>
		</Provider>
	</BrowserRouter>
)
