import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path = '/' element ={<Dashboard/>}/>
      <Route path = '/login' element ={<Login/>}/>
      <Route path = '/signup' element ={<SignUp/>}/>
      <Route path = '/*' element ={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App