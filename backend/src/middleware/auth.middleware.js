import jwt from "jsonwebtoken"
import User from "../models/users.model.js"

export const protectRoute =async (req,res,next)=>{
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({message:"unauthorized "})
        }
        const decoded =jwt.verify(token,process.env.MY_JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message:"unauthorized "})
        }
        const user= await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(404).json({message:"User not found "})
        }
        req.user=user
        next()

    } catch (error) {
        console.log("middleware issue",error)
        res.status(500).json({message:"Internal Servor Error"})
    }
}