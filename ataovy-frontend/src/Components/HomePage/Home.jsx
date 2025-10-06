import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./Sidebar";

const Home = () => {

    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const [userId, setUserId] = useState('');
    const [todo, setTodo] = useState([]);
    
    const navigate = useNavigate();

    const handleLogout = async () => {
        const response = await fetch(`${API_URL}/auth/logout` , {
            method: 'GET',
            credentials: 'include'
        });
        if(response.ok) {
            navigate('/');
        }
    }

    const getCurrentUserId = async() => {
        try{
            const response = await fetch(`${API_URL}/user/id`, 
                {
                    method: 'GET',
                    credentials: 'include'
                }
            )
            const data = await response.text();
            setUserId(data.substring(1,37))            
        } catch(e){
            console.log(e);
        }
    }



    const getTodos = async () => {
        try{
            const todo_raw = await fetch(`${API_URL}/todo/${userId}` , {
                method: 'GET', 
                credentials: 'include'
            })
            const todos = await todo_raw.json();
            console.log(todos);
            
            setTodo(todos);
        } catch (e) {
            console.log(e);            
        }
    }

    // useEffect(() => {
    //     const refresh = async () => {
    //         await getCurrentUserId();
    //         await getTodos();
    //     }
    //     refresh()
    // } , [])
    // useEffect(()=>{
    //     getTodos()
    // } , [userId])

    return (    
            <div className="w-screen h-screen bg-amber-50 flex justify-evenly items-center">
                <SideBar />
                <div className="w-[80%] h-[95%] bg-amber-300">TEst</div>
            </div>
    )
}
export default Home;