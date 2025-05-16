import express from "express"
import User from "../models/users.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js"
// import cloudinary from "../lib/cloudinary.js"


export const signup =async (req,res)=>{
    const {firstName,lastName,email,password} =req.body
    console.log(req.body)
    try {
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"Email Already exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt);


        // if(!lastName){lastName="";}
        const givenId= await User.find().countDocuments() + 10000001;
        
        const newUser =new User({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            givenId,
        })

        if(!newUser){
            return res.status(400).json({message:"Invalid Data"})
        }

        else{
            const token = generateToken(newUser._id,res)
            await newUser.save()
            res.status(201).json(newUser);
        }
    } catch (error) {
        console.log("signing up issues",error)
        res.status(500).json({message:"Internal Servor Error"})
    }
}
export const login =async (req,res)=>{
    const {email,password} =req.body
    try {
        let user = await User.findOne({email})
        if(!user){
            console.log("backend -USER NOT FOUND")
            return res.status(400).json({message:"Invalid Credentials"})
        }
        const isCorrect= await bcrypt.compare(password,user.password) 
        if(!isCorrect){
            console.log("backend -USER NOT PASSWORD")
            return res.status(400).json({message:"Invalid Credentials"})
        }
        else{
            let userObj = user.toObject();
            delete userObj.password;
            delete userObj.createdAt;
            delete userObj.updatedAt;
            delete userObj.__v;
            const token = generateToken(user._id,res)
            res.status(201).json(userObj)
        }

                
    } catch (error) {
        console.log("logging in issues",error)
        res.status(500).json({message:"Internal Servor Error"})
    }
}
export const logout =(req,res)=>{

    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged Out succesfully"})
    } catch (error) {
        console.log("logging out issues",error)
        res.status(500).json({message:"Internal Servor Error"})  
    }
}
export const update =async(req,res)=>{
    const {age,gender,skills,college,city,description}=req.body
    try {
        const userId= req.user._id
        const updatedUser=await User.findByIdAndUpdate(userId,{age,gender,skills,college,city,description,isProfileSetUp:true},{new:true}).select("-password")
        res.status(200).json(updatedUser);

    } catch (error) {
        console.log("updating issues",error)
        res.status(500).json({message:"Internal Servor Error"})  
    }
}
export const check =async(req,res)=>{
    try {
        res.status(201).json(req.user)
    } catch (error) {
        console.log("checking issues",error)
        res.status(500).json({message:"Internal Servor Error"})  
        
    }
}