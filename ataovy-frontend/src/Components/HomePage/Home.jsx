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

    return (
        <>
            <p>Welcome to Ataovy</p>
            <button className="bg-red-300 p-3 rounded-2xl"
                onClick={handleLogout}
            >
                Logout!!
            </button>
        </>
        
    )
}
export default Home;