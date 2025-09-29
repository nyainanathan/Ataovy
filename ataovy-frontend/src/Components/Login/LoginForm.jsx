import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    const handleLogin = async () => {
        try{
            const userInfo_raw = await fetch(`${API_URL}/user/${email}`)
            const userInfo = await userInfo_raw.json();
            if (!userInfo) {
                alert("There is no user assigned to this email");
                setEmail("");
                setPassword("");
            } else if (userInfo.password == password ){
                navigate("/home")
            } else {
                alert("Wrong credentials");
                setPassword("");
            }
        } catch(err){
            console.error(err);
        }
    }

    return (
        <div className="flex flex-col bg-amber-50 w-1/3 items-center gap-5 m-auto rounded-2xl p-8">
            <p>
                Welcome to <strong>Ataovy!</strong>
            </p>
            <div className="flex gap-4">
                <label htmlFor="email"> Email: </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" placeholder="email ..."/>
            </div>
            <div className="flex gap-4">
                <label htmlFor="password"> Password: </label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="password ... "/>
            </div>
            <button 
            className="bg-green-400 p-3 rounded-2xl"
            onClick={(e) => {
                e.preventDefault();
                handleLogin();
            }}
            >Login</button>
        
        </div>
    )
}
export default LoginForm;