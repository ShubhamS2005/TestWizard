import React, { useContext ,useEffect} from 'react'
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Sidebar from "./pages/Sidebar.jsx"
import './App.css'

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from './main.jsx'
import axios from "axios"
import './App.css'

import Login from "./pages/Login.jsx"
import Questions from "./pages/Questions.jsx"
import Register from './pages/Register.jsx'
import AddQuestion from './pages/AddQuestion.jsx'



function App() {
  const{isAuthenticated,setIsAuthenticated,setUser}=useContext(Context)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/patient/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);
  return (
    <>
     <Router>
    <Sidebar/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/questions' element={<Questions/>}/>
      <Route path='/addquestion' element={<AddQuestion/>}/>

      <Route path='/register' element={<Register/>}/>


      

    </Routes>
   <ToastContainer position='top-center'/>
   </Router>
    </>
  )
}

export default App
