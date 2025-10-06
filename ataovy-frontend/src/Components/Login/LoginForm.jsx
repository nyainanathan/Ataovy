import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    const motivationalTexts = [
    "Every task completed is a step forward!",
    "You're making progress, one todo at a time!",
    "Small steps lead to big accomplishments!",
    "Stay focused and watch your productivity soar!",
    "You've got this! Keep crushing those tasks!",
    "Productivity is built one task at a time!",
    "Your future self will thank you for starting today!"
    ];
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [messageIndex, setMessageIndex] = useState(0);
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_BACKEND_URL;
    
    useEffect(() => {
        const messageInterval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % motivationalTexts.length)
        }, 9000);
        return () => clearInterval(messageInterval);
    }, [messageIndex]);

    const handleLogin = async () => {
        try{
            const loginRequestObject = {
                email: email,
                password: password
            };
            const loginStatusRaw = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                body: JSON.stringify(loginRequestObject),
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const loginStatus = await loginStatusRaw.text();
            if(loginStatus == "Login successful"){
                navigate("/home")
            } else {
                alert(loginStatus);
            }
            
        } catch(err){
            console.error(err);
        }
    }



    return (
        <div className="w-screen h-screen flex">
            
            <div className="w-1/2 h-full bg-[url('/login-background.jpg')] bg-cover flex flex-col items-center justify-between p-16">
                
                <img src="/ataovy-logo-nobg.png" className=" w-1/3" alt="" />

                <p className="text-2xl text-white italic">
                    {motivationalTexts[messageIndex]}
                </p>
            </div>

            <div className="flex flex-col w-1/2 items-center gap-10 m-auto p-8 ">
                <p className="text-4xl">
                    Welcome to <strong className="text-[#5A5E2B]">Ataovy!</strong>
                </p>
                <p className="text-2xl font-light">
                    Welcome back! Please enter your credentials
                </p>
                <div className="flex gap-4 flex-col  w-1/2">
                    <label htmlFor="email"> Email: </label>
                        <input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        type="text" name="email" id="email" placeholder="Enter your email"
                        className="border-1 rounded p-2"
                        />
                </div>
                <div className="flex gap-4 flex-col w-1/2">
                    <label htmlFor="password"> Password: </label>
                    <input value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" name="password" id="password" placeholder="password ... "
                    className="border-1 rounded p-2"
                    />
                </div>
                <div className="flex flex-col gap-3 w-full items-center">
                    <button 
                    className="bg-[#E0C8B3] p-3 w-1/2 rounded-2xl  cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                    >Sign in </button>

                    <button
                    className="bg-[#635031] p-3 w-1/2 rounded-2xl cursor-pointer"
                    onClick={() => navigate("/signup")}
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </div>
        
    )
}
export default LoginForm;