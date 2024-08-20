import express from "express"
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import cookieParser from "cookie-parser";
// import cloudinary from "cloudinary"
import {errormiddleware} from "./middleware/errormiddleware.js"
import user_router from "./router/userRouter.js";
import question_router from "./router/qbRouter.js";

const app=express();

config({path:"./config/config.env"})

const port=process.env.PORT || 3000
const uri=process.env.DATABASE_URI

app.use(
    cors({
        origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
        methods:["GET","POST","PUT","DELETE"],
        credentials:true
    })
)
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));



// app listening
app.listen(port,()=>{
    console.log(`backend running at ${port}`)
})

// app use
app.use("/api/v1/user",user_router)
app.use("/api/v1/questions",question_router)


// Database connect
try {
    mongoose.connect(uri);
    console.log("database connected")
} catch (error) {
    console.log(`error:${err}`)
}


// // using cloudinary
// cloudinary.v2.config({
//     cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
//     api_key:process.env.CLOUDINARY_API_KEY,
//     api_secret:process.env.CLOUDINARY_API_SECRET
    
// })
// middleware error
app.use(errormiddleware)