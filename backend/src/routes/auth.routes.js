import express from "express"
const router = express.Router()
import {signup,login,logout,update,check,getUserProfile,googleAuth} from "../controller/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

router.post("/signup",signup)
router.post("/login",login)
router.post("/google-login",googleAuth)
router.post("/logout",logout)
router.put("/update-profile",protectRoute,update)
router.get("/check",protectRoute,check)
router.get("/profile/:userId",protectRoute,getUserProfile)


export default router