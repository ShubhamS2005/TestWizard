import {Questions} from "../models/quesstionBank.js"
import {catchAsyncErrors} from "../middleware/CatchAssyncErrors.js"
import ErrorHandler from "../middleware/errormiddleware.js"

export const AddQuestions=catchAsyncErrors(async(req,res,next)=>{
    const{Class,subject,marks,type,question}=req.body
    if(!Class||!subject||!marks||!type||!question){
        return next(new ErrorHandler("Please fill all details",400));
    }
    const qb=await Questions.findOne({question})


    if(qb){
        return next(new ErrorHandler("Quesstion Already exists",400));
    }
    else{
        await Questions.create({Class,subject,marks,type,question})
        res.status(200).json({
            success:true,
            message:"Question Added"
        })
    }
})

export const getAllQuestions=catchAsyncErrors(async(req,res,next)=>{
    const questions=await Questions.find()
    

    res.status(200).json({
        success:true,
        questions,
        
    })
})


export const DeleteQuestion=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params
    let question=await Questions.findById(id)
    if(!question){
       return next(new ErrorHandler("Question Not Found",404)) 
    }else{
        await question.deleteOne()
        res.status(200).json({
        success:true,
        message:"Question Deleted",
    })
    }
    
})