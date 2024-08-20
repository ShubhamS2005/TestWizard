import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import axios from 'axios'
import { Navigate,useNavigate} from 'react-router-dom'
import { RiDeleteBin2Fill } from "react-icons/ri";


import { toast } from "react-toastify";

const Questions = () => {
  const [questions,setQuestions]=useState([])
  const[one,setOne]=useState(true);
  const[three,setThree]=useState(false);
  const[four,setFour]=useState(false);
  const[five,setFive]=useState(false);
  const[six,setSix]=useState(false);

  const{isAuthenticated}=useContext(Context)

  const NavigateTo = useNavigate();
  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get(
          "https://testwizardbackend.onrender.com/api/v1/questions/getAllQuestions",
           { withCredentials: true }
          )
          setQuestions(data.questions)

      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    fetchQuestions()
  })

  const DeleteWard = async (e, qid) => {
    try {
      e.preventDefault();
      await axios
        .delete(`https://testwizardbackend.onrender.com/api/v1/questions/questionDelete/${qid}`)
        .then((res) => {

          toast.success(res.data.message);
          NavigateTo("/questions");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const change1=()=>{
    setOne(true)
    setThree(false)
    setFour(false)
    setFive(false)
    setSix(false)
  }
  const change2=()=>{
    setOne(false)
    setThree(true)
    setFour(false)
    setFive(false)
    setSix(false)
  }
  const change3=()=>{
    setOne(false)
    setThree(false)
    setFour(true)
    setFive(false)
    setSix(false)
  }
  const change4=()=>{
    setOne(false)
    setThree(false)
    setFour(false)
    setFive(true)
    setSix(false)
  }
  const change5=()=>{
    setOne(false)
    setThree(false)
    setFour(false)
    setFive(false)
    setSix(true)
  }
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return(
    <section className='page questions'>
      <h1>Questions</h1>
      <div>
      <button onClick={change1}>1 Marks</button>
      <button onClick={change2}>3 Marks</button>
      <button onClick={change3}>4 Marks</button>
      <button onClick={change4}>5 Marks</button>
      <button onClick={change5}>6 Marks</button>
      </div>
      <div className="banner" style={one?{display:"block"}:{display:"none"}}>
        {
           questions && questions.length>0 ? (
            questions
            .filter((element)=>element.marks===1)
            .map(element=>{
            return(
              <div className="card">
                <div className="details">
                  <p>Subject: <span>{element.subject}</span></p>
                  <p>Class: <span>{element.Class}</span></p>
                  <p>Question Type: <span>{element.type}</span></p>
                  <p>Marks: <span>{element.marks}</span></p>
                  <p>Question: <span>{element.question}</span></p>
                  <div className='tdButton'>
                  <p
                    className=" red"
                    onClick={(e) => {
                      DeleteWard(e, element._id);
                    }}
                  >
                  <RiDeleteBin2Fill />
                </p>

                  </div>

                </div>
              </div>
            )
          })):<h1>No Questions Found</h1>
        }
      </div>

      <div className="banner" style={three?{display:"block"}:{display:"none"}}>
        {
           questions && questions.length>0 ? (
            questions
            .filter((element)=>element.marks===3)
            .map(element=>{
            return(
              <div className="card">
                <div className="details">
                  <p>Subject: <span>{element.subject}</span></p>
                  <p>Class: <span>{element.Class}</span></p>
                  <p>Question Type: <span>{element.type}</span></p>
                  <p>Marks: <span>{element.marks}</span></p>
                  <p>Question: <span>{element.question}</span></p>
                  <div className='tdButton'>
                  <p
                    className=" red"
                    onClick={(e) => {
                      DeleteWard(e, element._id);
                    }}
                  >
                  <RiDeleteBin2Fill />
                </p>

                  </div>
                </div>
              </div>
            )
          })):<h1>No Questions Found</h1>
        }
      </div>

      <div className="banner" style={four?{display:"block"}:{display:"none"}}>
        {
           questions && questions.length>0 ? (
            questions
            .filter((element)=>element.marks===4)
            .map(element=>{
            return(
              <div className="card">
                <div className="details">
                  <p>Subject: <span>{element.subject}</span></p>
                  <p>Class: <span>{element.Class}</span></p>
                  <p>Question Type: <span>{element.type}</span></p>
                  <p>Marks: <span>{element.marks}</span></p>
                  <p>Question: <span>{element.question}</span></p>
                  <div className='tdButton'>
                  <p
                    className=" red"
                    onClick={(e) => {
                      DeleteWard(e, element._id);
                    }}
                  >
                  <RiDeleteBin2Fill />
                </p>

                  </div>
                </div>
              </div>
            )
          })):<h1>No Questions Found</h1>
        }
      </div>

      <div className="banner" style={five?{display:"block"}:{display:"none"}}>
        {
           questions && questions.length>0 ? (
            questions
            .filter((element)=>element.marks===5)
            .map(element=>{
            return(
              <div className="card">
                <div className="details">
                  <p>Subject: <span>{element.subject}</span></p>
                  <p>Class: <span>{element.Class}</span></p>
                  <p>Question Type: <span>{element.type}</span></p>
                  <p>Marks: <span>{element.marks}</span></p>
                  <p>Question: <span>{element.question}</span></p>
                  <div className='tdButton'>
                  <p
                    className=" red"
                    onClick={(e) => {
                      DeleteWard(e, element._id);
                    }}
                  >
                  <RiDeleteBin2Fill />
                </p>

                  </div>
                </div>
              </div>
            )
          })):<h1>No Questions Found</h1>
        }
      </div>

      <div className="banner" style={six?{display:"block"}:{display:"none"}}>
        {
           questions && questions.length>0 ? (
            questions
            .filter((element)=>element.marks===6)
            .map(element=>{
            return(
              <div className="card">
                <div className="details">
                  <p>Subject: <span>{element.subject}</span></p>
                  <p>Class: <span>{element.Class}</span></p>
                  <p>Question Type: <span>{element.type}</span></p>
                  <p>Marks: <span>{element.marks}</span></p>
                  <p>Question: <span>{element.question}</span></p>
                  <div className='tdButton'>
                  <p
                    className=" red"
                    onClick={(e) => {
                      DeleteWard(e, element._id);
                    }}
                  >
                  <RiDeleteBin2Fill />
                </p>

                  </div>
                </div>
              </div>
            )
          })):<h1>No Questions Found</h1>
        }
      </div>
      
    </section>
  )
}

export default Questions 
