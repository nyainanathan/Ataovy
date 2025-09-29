const LoginForm = () => {
    return (
        <div className="flex flex-col bg-amber-50 w-1/3 items-center gap-5 m-auto rounded-2xl p-8">
            <p>
                Welcome to <strong>Ataovy!</strong>
            </p>
            <div className="flex gap-4">
                <label htmlFor="email"> Email: </label>
                    <input type="text" name="email" id="email" placeholder="email ..."/>
            </div>
            <div className="flex gap-4">
                <label htmlFor="password"> Password: </label>
                <input type="password" name="password" id="password" placeholder="password ... "/>
            </div>
            <button 
            className="bg-green-400 p-3 rounded-2xl"
            >Login</button>
        
        </div>
    )
}
export default LoginForm;