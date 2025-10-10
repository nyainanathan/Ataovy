import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Background from "./Background";

const SignupForm = () => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_BACKEND_URL;
    
    const addTheNewUser = async () => {
        try{
            const newUser = {
                firstName: firstname,
                lastName: lastname, 
                email, 
                password
            }
            const response = await fetch(`${API_URL}/user/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return true;
        } catch(err){
            console.error(err);
            alert("Failed to create user. Please try again.");
            return false;
        }
    }

    const handleSignup = async () => {
        if(!firstname || !lastname || !email || !password) {
            alert("Fill up every field!")
        } else if (password != confirmPassword) {
            alert("The passwords are not matching!")
        } else {
            const success = await addTheNewUser();
            if (success) {
                alert("User created successfully!");
                navigate("/");
            }
        }
    }

    return (
        <div className="w-screen h-screen flex">
            <Background />
            <div className="flex flex-col  w-1/2 items-center gap-2 m-auto rounded-2xl p-8">
                <p className="text-4xl">Enter your informations</p>
                <div className="flex gap-4 flex-col w-1/2">
                    <label htmlFor="fistname">Firstname: </label>
                    <input 
                    value={firstname} onChange={(e) => setFirstname(e.target.value)} 
                    type="text" name="firstname" id="firstname" placeholder="First name ..."
                    className="border-1 rounded p-2"
                    />
                </div>
                <div className="flex gap-4 flex-col w-1/2">
                    <label htmlFor="lastname">Lastname: </label>
                    <input 
                    value={lastname} onChange={(e) => setLastname(e.target.value)} 
                    type="text" name="lastname" id="lastname" placeholder="Last name ..."
                    className="border-1 rounded p-2"
                    />
                </div>
                <div className="flex gap-4 flex-col w-1/2">
                    <label htmlFor="email">Email: </label>
                    <input 
                    value={email} onChange={(e) => setEmail(e.target.value)} 
                    type="email" name="email" id="email" placeholder="email ..."
                    className="border-1 rounded p-2"
                    />
                </div>
                <div className="flex gap-4 flex-col w-1/2">
                    <label htmlFor="password">Password: </label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} 
                    type="password" name="password" id="password" placeholder="password .."
                    className="border-1 rounded p-2"
                    />
                </div>
                <div className="flex gap-4 flex-col w-1/2">
                    <label htmlFor="password-confirm">Confirm password: </label>
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
                    type="password" name="passwordConfirm" id="password-confirm" placeholder="Confirm password ..." 
                    className="border-1 rounded p-2"
                    />
                </div>
                <div className="flex flex-col gap-3 w-full items-center">
                    <button
                        onClick={()=> navigate("/")}
                        className="bg-[#E0C8B3] p-3 w-1/2 rounded-2xl  cursor-pointer"
                    >
                        Return to login page
                    </button>
                    <button
                        className="bg-[#635031] p-3 w-1/2 rounded-2xl cursor-pointer"
                        onClick={handleSignup}
                    >
                        SIGN ME UP!!
                    </button>
            </div>
        </div>
        </div>
        
    )
}

export default SignupForm