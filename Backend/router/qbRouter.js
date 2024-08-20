import express from "express"
import { AddQuestions, DeleteQuestion, getAllQuestions } from "../controllers/qbController.js"
const qb_router =express.Router()



// post requests
qb_router.post("/addquestion",AddQuestions)



// get requests
qb_router.get("/getAllquestions",getAllQuestions)


// Delete Requests
qb_router.delete("/questionDelete/:id",DeleteQuestion)



export default  qb_router