import express from "express"
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "../../.env") });
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import taskRoutes from "./routes/task.routes.js"
import offerRoutes from "./routes/offer.routes.js"
import messageRoutes from "./routes/message.route.js"
import {connectDB} from "./lib/db.js"
import { connectRedis } from "./lib/redis.js"
import {io,app,server} from "./lib/socket.js"
import cors from "cors"
// import { saveCSVData } from "./controller/temp.controller.js"


app.use(express.json({ limit: '10mb' }));
app.use(cookieParser())
app.use(cors(
    {
        origin:process.env.BASE_URL,
        credentials: true
    }
))
app.use("/api/auth",authRoutes)     
app.use("/api/task",taskRoutes)   
app.use("/api/offer",offerRoutes)
app.use("/api/messages",messageRoutes)



// Serve frontend build static files
app.use("/app/", express.static(path.join(__dirname, "../../frontend/dist")));

// Serve index.html for /app/* (React routing)
app.get("/app/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
});

// Static files for DemoPage (landing, about, etc.)
app.use("/", express.static(path.join(__dirname, "../../DemoPage/dist")));

// Serve index.html for root and other DemoPage routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../DemoPage/dist", "index.html"));
});




server.listen(process.env.PORT,"0.0.0.0",()=>{
    console.log("server started")
    connectDB();
    connectRedis();
    // saveCSVData();

})