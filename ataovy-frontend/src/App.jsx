import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginForm from './Components/Login/LoginForm'
import Home from './Components/HomePage/Home'
function App() {
  return (
    <Routes>
      <Route path='/' element=<LoginForm/> > </Route>
      <Route path='/home' element= <Home/> ></Route>
    </Routes>
  )
}

export default App
