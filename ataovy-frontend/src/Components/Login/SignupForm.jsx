import { useState } from "react";
import { useNavigate } from "react-router-dom"

const SignupForm = () => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const navigate = useNavigate();

    const handleSignup = () => {
        if(!firstname || !lastname || !email || !password) {
            alert("Fill up every field!")
        } else if (password != confirmPassword) {
            alert("The passwords are not matching!")
        } else {
            alert("everything good")
        }
    }

    return (
        <div className="flex flex-col bg-amber-50 w-1/3 items-center gap-5 m-auto rounded-2xl p-8">
            <p>Sign up form!!</p>
            <div className="flex gap-4">
                <label htmlFor="fistname">Firstname: </label>
                <input value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" name="firstname" id="firstname" placeholder="First name ..."/>
            </div>
            <div className="flex gap-4">
                <label htmlFor="lastname">Lastname: </label>
                <input value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" name="lastname" id="lastname" placeholder="Last name ..."/>
            </div>
            <div className="flex gap-4">
                <label htmlFor="email">Email: </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="email ..."/>
            </div>
            <div className="flex gap-4">
                <label htmlFor="password">Password: </label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="password .." />
            </div>
            <div className="flex gap-4">
                <label htmlFor="password-confirm">Confirm password: </label>
                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="passwordConfirm" id="password-confirm" placeholder="Confirm password ..." />
            </div>
            <div className="flex gap-8">
                <button
                    onClick={()=> navigate("/")}
                    className="bg-green-400 p-3 rounded-2xl"
                >
                    Return to login page
                </button>
                <button
                    className="bg-blue-400 p-3 rounded-2xl"
                    onClick={handleSignup}
                >
                    SIGN ME UP!!
                </button>
            </div>
        </div>
    )
}

export default SignupForm