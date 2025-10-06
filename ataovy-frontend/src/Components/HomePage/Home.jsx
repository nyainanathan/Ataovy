import { useNavigate } from "react-router-dom";

const Home = () => {

    const API_URL = import.meta.env.VITE_BACKEND_URL;

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
            console.log(data);
        } catch(e){
            console.log(e);
            
        }
        
    }

    return (
        <>
            <p>Welcome to Ataovy</p>
            <button className="bg-red-300 p-3 rounded-2xl"
                onClick={handleLogout}
            >
                Logout!!
            </button>

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