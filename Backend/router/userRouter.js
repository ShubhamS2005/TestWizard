import express from "express"
import {GetUser, login, UserLogout, UserRegister, verifyforget} from "../controllers/userController.js"
import { isUserAuthenticated } from "../middleware/auth.js"
const user_router =express.Router()



// post requests
user_router.post("/register",UserRegister)
user_router.post("/login",login)
user_router.post("/forget",verifyforget)


// get requests
user_router.get("/patient/me",isUserAuthenticated,GetUser)
user_router.get("/patient/logout",isUserAuthenticated,UserLogout)





export default user_router