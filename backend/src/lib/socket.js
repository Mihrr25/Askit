import { Server } from "socket.io"
import http from 'http'
import express from "express"
import cookie from "cookie"
import jwt from "jsonwebtoken"
import  User from "../models/users.model.js"
import dotenv from "dotenv"

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: [process.env.BASE_URL],
        credentials: true
    },
})

const userSocketMap = {};

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

io.use(async(socket, next) => {
    const rawCookies = socket.handshake.headers.cookie;
    if (!rawCookies) {
      console.log("No cookies found, rejecting connection.");
      return next(new Error("Unauthorized: No cookies"));
    }
    const parsedCookies = cookie.parse(rawCookies);
    const token = parsedCookies.jwt;
  
    if (!token) {
      console.log("No auth token found, rejecting connection.");
      return next(new Error("Unauthorized: No token"));
    }
  
    try {
      const decoded = jwt.verify(token, process.env.MY_JWT_SECRET);
      if(!decoded) {
        console.log("Invalid token, rejecting connection.");
        return next(new Error("Unauthorized: Invalid token"));
      }
      const user = await User.findById(decoded.userId).select("-password")
      if(!user) {
        console.log("User not found, rejecting connection.");
        return next(new Error("Unauthorized: User not found"));
      }
      socket.user = user;
      next();  
    } catch (error) {
      console.log("Invalid token, rejecting connection.");
      return next(new Error("Unauthorized: Invalid token"));
    }
  });

io.on("connection", async (socket) => {
    try{
        const userId=socket.user.givenId
        if(userId) userSocketMap[userId]=socket.id
    
        console.log(userSocketMap)
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
        socket.on("disconnect",()=>{
            console.log("user Disconnected",socket.id)
            delete userSocketMap[userId]
            io.emit("getOnlineUser",Object.keys(userSocketMap));
        })
    }
    catch(err){
        console.log(err)
        if(userSocketMap[socket.user.givenId]){
            delete userSocketMap[socket.user.givenId]
        }
        socket.disconnect();
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    }
})

export { io, app, server,userSocketMap }