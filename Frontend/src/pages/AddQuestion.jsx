import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

import { toast } from "react-toastify";

const AddQuestion = () => {
  const{isAuthenticated}=useContext(Context)
  const [Class, setClass] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [type, setType] = useState("");
  const [question, setQuestion] = useState("");


  const HandleNewQuestion = async (e) => {
    try {
      e.preventDefault();
      await axios.post(
        "https://testwizardbackend.onrender.com/api/v1/questions/addquestion",
        { Class,subject,marks,type,question},
        {
          withCredentials: true,
          headers: "Content-Type:application/json"
        }).then((res)=>{
          toast.success(res.data.message)
          NavigateTo("/login")
        })
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const NavigateTo=useNavigate()
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return(
    <>
    <section className="page ">
    <h1>TestWizard</h1>
    <h2 style={{textAlign:"center"}}>Add New Question</h2>
        <form onSubmit={HandleNewQuestion}>
          <div className="form-container">

          <div >
            <input
              type="text"
              placeholder="Class"
              value={Class}
              onChange={(e) => setClass(e.target.value)}
            />
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            </div>
            <div>
         
            <input
              type="Number"
              placeholder="Marks"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
            />
            <select
              type="text"
              placeholder="Type of Question"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
            <option value="MCQ">MCQ</option>
            <option value="Fill In Blanks">Fill In Blanks</option>
            <option value="Assertion Reason">Assertion Reason</option>
            <option value="Very Short Answer">Very Short Answer</option>
            <option value="Short Answer">Short Answer</option>
            <option value="Long Answer">Long Answer</option>
            <option value="Case Study">Case Study</option>
            <option value="Maps">Maps</option>
            </select>
          </div>

          <div>
            <textarea 
            name="question" 
            id="question" 
            cols="30" 
            rows="10"
            value={question}
            onChange={(e)=>setQuestion(e.target.value)}
            >

            </textarea>
          </div>

          
          <button type="submit" className="Submit">Add New Question </button>
          </div>
        </form>
      </section>  
    </>
  )
}

export default AddQuestion
