import { Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './components/register/Register'
import Login from './components/login/Login'
import DashBoard from './components/dashboard/DashBoard'


function App() {

  return (
    <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<DashBoard/>}/>
    </Routes>
  )
}

export default App
