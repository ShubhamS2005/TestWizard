import React, { useContext, useState } from 'react'
import { Context } from '../main'
import { Navigate, useNavigate ,Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
const Login = () => {
  const {isAuthenticated,setIsAuthenticated}=useContext(Context);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const navigateTo=useNavigate()

  const handleLogin=async(e)=>{
    e.preventDefault()
    try {
      await axios.post(
        "http://localhost:8000/api/v1/user/login",
        { email, password, confirmPassword},
        {
        withCredentials:true,
        headers:{'Content-Type':"application/json"}
      }).then((res)=>{
        toast.success(res.data.message)
        setIsAuthenticated(true)
        navigateTo("/questions")
      })
    } catch (error) {
      toast.error(error.response.data.message)
    }
  } 
  const NavigateTo = useNavigate();
  if(isAuthenticated){
    return <Navigate to={'/questions'}/>
  }
  return (
    <>
    <div className="container ">
    <div className="login">
        <h1>TestWizard</h1>
        <h2>Welcome to TestWizard</h2>
        
        <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>setConfirmPassword(e.target.value)}
            />
            <div>
            <button type="submit" className="Submit">Login</button>
            
            <button onClick={()=>NavigateTo('/register')} className="Submit">Register</button>
            </div>
        </form>
      </div>
    </div>
      
    </>
  )
}

export default Login
 