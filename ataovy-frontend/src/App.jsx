import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginForm from './Components/Login/LoginForm'
import Home from './Components/HomePage/Home'
import SignupForm from './Components/Login/SignupForm'

function App() {
  return (
    <Routes>
      <Route path='/' element=<LoginForm/> > </Route>
      <Route path='/home' element= <Home/> ></Route>
      <Route path='/signup' element =<SignupForm/> ></Route>
    </Routes>
  )
}

export default App
