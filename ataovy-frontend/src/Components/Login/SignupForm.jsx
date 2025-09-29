import { useNavigate } from "react-router-dom"

const SignupForm = () => {

    const navigate = useNavigate();

    return (
        <div className="flex flex-col bg-amber-50 w-1/3 items-center gap-5 m-auto rounded-2xl p-8">
            <p>Sign up form!!</p>
            <div className="flex gap-4">
                <label htmlFor="fistname">Firstname: </label>
                <input type="text" name="firstname" id="firstname" placeholder="First name ..."/>
            </div>
            <div className="flex gap-4">
                <label htmlFor="lastname">Lastname: </label>
                <input type="text" name="lastname" id="lastname" placeholder="Last name ..."/>
            </div>
            <div className="flex gap-4">
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" placeholder="email ..."/>
            </div>
            <div className="flex gap-4">
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" placeholder="password .." />
            </div>
            <div className="flex gap-4">
                <label htmlFor="password-confirm">Confirm password: </label>
                <input type="password" name="passwordConfirm" id="password-confirm" placeholder="Confirm password ..." />
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
                >
                    SIGN ME UP!!
                </button>
            </div>
        </div>
    )
}

export default SignupForm