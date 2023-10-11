import Container from "react-bootstrap/Container";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { completedTasksSelector, notCompletedTasksSelector, taskSelector } from "./selectorsApp";
import { useEffect, useState } from "react";
import TasksList from "./components/TasksList/TasksList";
import NavBar from "./components/NavBar/NavBar";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import { addTask, editTask } from "./redux/appSlice";

function App() {
    const dispatch=useDispatch()
    const [list, setList] = useState([]);
    const [nameList, setNameList] = useState("completedTasksList");
    const [nameOpenList, setNameOpenList] = useState("");
    const completedTasksList = useSelector(completedTasksSelector);
    const notCompletedTasksList = useSelector(notCompletedTasksSelector);
    const taskInModal=useSelector(taskSelector)

    const [openModalNewTask, setOpenModalNewTask] = useState(false);
    const [openModalEditTask, setOpenModalEditTask] = useState(false);

    useEffect(() => {
        if (nameList === "completedTasksList") {
            setList(completedTasksList);
            setNameOpenList("Виконані завдання");
        } else {
            setList(notCompletedTasksList);
            setNameOpenList("Не виконані завдання");
        }
    }, [nameList, completedTasksList, notCompletedTasksList]);
    const actionAddNewTask=(task)=>{
        dispatch(addTask({...task}))
    }
    const actionEditTask=(task)=>{
        dispatch(editTask({...task}))
    }
    return (
        <div className="App">
            <NavBar setNameList={setNameList} setOpenModalNewTask={setOpenModalNewTask}/>
            <Container>
                <TasksList nameOpenList={nameOpenList} list={list} setOpenModalEditTask={setOpenModalEditTask}/>
                {openModalNewTask && <ModalWindow fnOpen={setOpenModalNewTask} action={actionAddNewTask}/>}
                {openModalEditTask && <ModalWindow fnOpen={setOpenModalEditTask} taskData={taskInModal} action={actionEditTask} />}
            </Container>
        </div>
    );
}

export default App;
