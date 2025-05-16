import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MONGODB Connected`)
    } catch (error) {
        console.log(`MONGODB CONEECTION ERROR : ${error}`)
    }
}