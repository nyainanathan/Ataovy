import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <>
            <p>Welcome to Ataovy</p>
            <button className="bg-red-300 p-3 rounded-2xl"
                onClick={handleLogout}
            >
                Logout!!
            </button>

            <button
                onClick={getTodos}
            >
                Get those todos
            </button>

        
            {todo.map((el, index) => (
                <p>{el.description}</p>
            ))}
        

            <button
                onClick={getCurrentUserId}
                className="bg-amber-50 p-3 rounded-2xl"
            >

                Get current user Id
            </button>
        </>
        
    )
}
export default Home;