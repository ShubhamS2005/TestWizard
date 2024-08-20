import {User} from "../models/user_scheema.js"
import {catchAsyncErrors} from "../middleware/CatchAssyncErrors.js"
import ErrorHandler from "../middleware/errormiddleware.js"
import {generateToken} from "../Utils/jwtToken.js"
import { config } from "dotenv";
import nodemailer from "nodemailer"
import Randomstring from "randomstring";

config({path:"./config/config.env"})

export const UserRegister=catchAsyncErrors(async(req,res,next)=>{
    const{firstname,lastname,email,phone,dob,gender,password}=req.body
    if(!firstname||!lastname||!email||!phone||!dob||!gender||!password){
        return next(new ErrorHandler("Please fill full form",400));
    }
    const user=await User.findOne({email})
    if(user){
        return next(new ErrorHandler("User Already registered",400));
    }
    else{
        await User.create({firstname,lastname,email,phone,dob,gender,password,role:"User"})
        // generateToken(user,"user registered",200,res)
        res.status(200).json({
            success:true,
            message:"User Registered"
        })
    }
})

export const login=catchAsyncErrors(async(req,res,next)=>{
    const{email,password,confirmPassword}=req.body;
    if(!email||!password||!confirmPassword){
        return next(new ErrorHandler("Please Provide all details",400));
    }
    if(password!==confirmPassword){
        return next(new ErrorHandler("Password and confirm password not same",400));
    }
    const user=await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid Email or password",400));
    }
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or password",400));
    }
    generateToken(user,"User Logged in Successfully",200,res)
})

export const GetUser=catchAsyncErrors(async(req,res,next)=>{
    const user=req.user
    res.status(200).json({
        success:true,
        user
    })

})

export const UserLogout=catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("userToken","",{
        httpOnly:true,
        expires:new Date(Date.now())
    }).json({
        success:true,
        message:"User Log out succesfully"
    })
})

export const AdminLogout=catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("adminToken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
        
    }).json({
        success:true,
        message:"Admin Log out succesfully"
    })
})





// reset password
export const sendresetpasswordmail=catchAsyncErrors(async(firstname,lastname,email,token)=>{
    try {
        const transpoter=nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:465,
            requireTLS:true,
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.PASSWORD_USER
            }
        });
        const mailoptions={
            from:process.env.EMAIL_USER,
            to:email,
            subject:'Reset Password of TestWizard',
            html:'<p>Hii '+firstname+" "+lastname+',this email is send to reset your password of TestWizard Website which you had requested to  chenge the password, please click here to <a href="http://127.0.0.1:8000/Forget-password?token='+token+'">Reset</a> your password.</p>'
        }
        transpoter.sendMail(mailoptions,function(error,info){
            if(error){
                console.log("mail sent");
            }
            else{
                console.log("Email has been sent:- ",info.response);
            }
        })
    } catch (error) {
        return next(new ErrorHandler("Error Occured While Sending Mail",400));
    }
})

 
export const verifyforget=catchAsyncErrors(async(req,res,next)=>{
    try {
        const email=req.body.email;
        const firstname=req.body.firstname;
        const userData=await User.findOne({firstname:firstname});
        
        if(userData){ 
            if(userData.email===email){
                if(userData.firstname===firstname){
                    const randomstring= Randomstring.generate();
                    const updateData=await User.updateOne({email:email},{$set:{token:randomstring}});
                    sendresetpasswordmail(firstname,userData.lastname,email,randomstring);
                    res.status(200).json({
                        success:true,
                        message:"Please check your mail to reset password"
                    })
                }
                
                                      
            }
            else{
                return next(new ErrorHandler("Email or firstname incorrect",400));
            }         
        }
        else{
            return next(new ErrorHandler("Email or firstname incorrect",400));
        }
    }
    catch (error) {
        console.log(error.message);
    }
})


const forgetpasswordload=async(req,res,next)=>{
    try {
       const token=req.query.token;
       const tokendata=await User.findOne({token:token});
       if(tokendata){
        res.render('Forget-password',{user_id:tokendata._id});
       }
       else{
            res.render('404',{message:'Token Is Inavalid'})
       } 
    } catch (error) {
        console.log(error.message);
    }

}
const resetpassword=async(req,res)=>{
    try {
        const password=req.body.password;
        const user_id=req.body.user_id;
        const secrure_password=await secrurepassword(password);
        const updatedata= await User.findByIdAndUpdate({_id:user_id},{$set:{password:secrure_password,token:''}})
        res.redirect("/login");
    } catch (error) {
        console.log(error.message);
    }
}