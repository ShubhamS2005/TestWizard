import mongoose from "mongoose";

const QuestionsScheema=new mongoose.Schema({
    Class:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true,
    },
    marks:{
        type:Number,
        required:true,
    },
    type:{
        type:String,
        required:true,
        enum:["Short Answer","Long Answer","Very Short Answer","MCQ","Case Study","Maps","Fill In Blanks","Assertion Reason"]
    },
    question:{
        type:String,
        required:true
    },
    
})



export const Questions=mongoose.model("Questions",QuestionsScheema)