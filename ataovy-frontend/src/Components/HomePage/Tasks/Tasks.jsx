import { useEffect, useState, useCallback } from "react";
import TopTask from "./TopTask";
import SearchBar from "./SearchBar";
import TaskContainer from "./TaskContainer";
import Task from "./Task";
import Archived from "./Archived";

const Tasks = () => {

    const [tasks, setTasks] = useState([]);
    const [userId, setUserId] = useState("");

    const possibleTaskStatus = ['NOT_STARTED', 'IN_PROGRESS', 'DONE']; 

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    const refreshTasks = useCallback(async () => {
        try {
            // Getting the current user's id
            const response = await fetch(`${API_URL}/user/id`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.text();
            const id = data.substring(1, 37);
            setUserId(id);

            // From the previous Id, fetch all the todos
            const todo_raw = await fetch(`${API_URL}/todo/${id}`, {
                method: 'GET',
                credentials: 'include',
            });
            const todos = await todo_raw.json();
            setTasks(todos);
        } catch (e) {
            console.error(e);
        }
    }, [API_URL]);

    useEffect(() => {
        refreshTasks();
    }, [refreshTasks]);

    return (
        <div className="w-[80%] h-[95%] bg-blue-100 rounded-2xl p-3 flex flex-col items-center gap-3">
            <TopTask tasks={tasks}/>
            <SearchBar tasks={tasks} changeTasks={setTasks} userId={userId} onChange={refreshTasks} />
            <div className="flex h-3/5 w-full">

                {
                    possibleTaskStatus.map((el, index) => (

                        <TaskContainer key={el} task={tasks} taskStatus={el} onChange={refreshTasks} />
                    )
                    )
                }
            <Archived />
            </div>
        </div>
    )
}

export default Tasks;