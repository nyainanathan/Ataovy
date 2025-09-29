import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginForm from './Components/Login/LoginForm'
function App() {
  return (
    <Routes>
      <Route path='/' element=<LoginForm/> > </Route>
    </Routes>
  )
}

export default App
