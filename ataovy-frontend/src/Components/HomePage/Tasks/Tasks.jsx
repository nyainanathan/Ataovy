import { useEffect, useState } from "react";
import TopTask from "./TopTask";
import SearchBar from "./SearchBar";

const Tasks = () => {

    const [tasks, setTasks] = useState([]);
    const [userId, setUserId] = useState("");

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(()=> {
        const gettingUserIdAndTasks = async() =>{
            try{
                //Getting the current user's id
                const response = await fetch(`${API_URL}/user/id`, 
                {
                    method: 'GET',
                    credentials: 'include'
                })
                const data = await response.text();
                setUserId(data.substring(1,37));
                
                //From the previous Id, fetch all the todos
                const todo_raw = await fetch(`${API_URL}/todo/${data.substring(1,37)}` , {
                    method: 'GET', 
                    credentials: 'include'
                })
                const todos = await todo_raw.json();
                setTasks(todos);
                //console.log(todos);
                
        } catch (e) {
            console.error(e);            
        }
        }
        gettingUserIdAndTasks()
    } , [])

    return (
        <div className="w-[80%] h-[95%] bg-blue-100 rounded-2xl p-3 flex flex-col items-center gap-3">
            <TopTask tasks={tasks}/>
            <SearchBar tasks={tasks} />
        </div>
    )
}

export default Tasks;