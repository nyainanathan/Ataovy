import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./Sidebar";
import Tasks from "./Tasks/Tasks";

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

    return (    
            <div className="w-screen h-screen bg-amber-50 flex justify-evenly items-center">
                <SideBar />
                <Tasks />
            </div>
    )
}
export default Home;