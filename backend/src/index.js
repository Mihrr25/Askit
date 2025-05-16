import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import taskRoutes from "./routes/task.routes.js"
import offerRoutes from "./routes/offer.routes.js"
import messageRoutes from "./routes/message.route.js"
// import messageRoutes from "./routes/message.routes.js"
import {connectDB} from "./lib/db.js"
import {io,app,server} from "./lib/socket.js"
import cors from "cors"

dotenv.config()


app.use(express.json({ limit: '10mb' }));
app.use(cookieParser())
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials: true
    }
))
app.use("/api/auth",authRoutes)     
app.use("/api/task",taskRoutes)   
app.use("/api/offer",offerRoutes)
app.use("/api/messages",messageRoutes)

// app.use("/api/messages",messageRoutes)



server.listen(process.env.PORT,()=>{
    console.log("server started")
    connectDB()

})