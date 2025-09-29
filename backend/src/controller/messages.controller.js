import Message from "../models/messages.model.js";
import UserChats from "../models/userChats.model.js";
import User from "../models/users.model.js";
import { io, userSocketMap } from "../lib/socket.js"
import Offer from "../models/offers.model.js";
import Reviews from "../models/review.model.js";
import Tasks from "../models/tasks.model.js";

import exp from "constants";
import Alerts from "../models/alerts.model.js";

export const getChats = async (req, res) => {
    try {
        let obj = {};
        const chats = await UserChats.findOne({ userChats: req.user.givenId })
        // console.log("chats123", chats)
        if (chats) obj = { ...obj, chats, };
        else {
            const newUserChat = new UserChats({
                userChats: req.user.givenId,
                chats: {}
            })
            await newUserChat.save()
            obj = { ...obj, chats: newUserChat };
        }
        // console.log("chats",obj.chats)
        for (const key in obj.chats.chats) {
            const chat = obj.chats.chats[key];
            const user = await User.findOne({ givenId: key });
            if (user) {
                obj.chats.chats[key].userDetails = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    givenId: user.givenId,
                    profilePic: user.profilePic,
                };
            }
            let message = await Message.findById(chat.messageId).select("message createdAt")
            if (message) {
                obj.chats.chats[key].message = message.message;
                obj.chats.chats[key].createdAt = message.createdAt;
            }
            else {
                obj.chats.chats[key].message = "";
                obj.chats.chats[key].createdAt = new Date();
            }
        }
        console.log("chats",obj.chats)
        res.status(200).json(obj.chats.chats);
    } catch (error) {
        console.log("Error getting chats", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { friendId } = req.params;
        if (!friendId || isNaN(friendId)) {
            return res.status(400).json({ message: "Invalid friend ID" });
        }
        const user = await User.findOne({ givenId: friendId })
        if (!user) {
            return res.status(400).json({ message: "Invalid User" })
        }
        const messages = await Message.find({
            $or: [{ senderId: req.user.givenId, receiverId: friendId }, { receiverId: req.user.givenId, senderId: friendId }]
        }).sort({ createdAt: 1 });
        const obj = {
            messages,
            userDetails: {
                firstName: user.firstName,
                lastName: user.lastName,
                givenId: user.givenId,
                profilePic: user.profilePic,
            }

        }
        const senderChat = await UserChats.findOne({ userChats: req.user.givenId })
        let sb=false;
        if(senderChat&&senderChat.chats&&senderChat.chats[friendId.toString()]){
            senderChat.set(`chats.${friendId.toString()}`, {
                ...senderChat.chats[friendId.toString()],
                unreadMessages: 0,
            });
            console.log("senderChat",senderChat)
            await senderChat.save();
        }
        else{
            // senderChat.chats={};
            // await senderChat.save();
            sb=true;
        }


        let obj1 = { chats: senderChat.chats, };
        if(!obj1.chats){
            obj1.chats = {};
        }
        if(sb){
            obj1.chats[friendId.toString()] = {
                messageId: "",
                unreadMessages: 0,
                time: new Date(),
            }}
        for (const key in obj1.chats) {
            // console.log("hello")
            const chat = obj1.chats[key];
            const user = await User.findOne({ givenId: key });
            if (user) {
                obj1.chats[key].userDetails = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    givenId: user.givenId,
                    profilePic: user.profilePic,
                };
            }
            if(chat.messageId){let message = await Message.findById(chat.messageId).select("message createdAt")
            if (message) {
                obj1.chats[key].message = message.message;
                obj1.chats[key].createdAt = message.createdAt;
            }
            else {
                obj1.chats[key].message = "";
                obj1.chats[key].createdAt = new Date();
            }}
            else{
                
                obj1.chats[key].message = "";
                obj1.chats[key].createdAt = new Date();
            
            }
        }

        if(sb==false){
            let obj12={userId:friendId,chat:senderChat.chats[friendId.toString()]};
            obj12.chat.userDetails={
                firstName: user.firstName,
                lastName: user.lastName,
                givenId: user.givenId,
                profilePic: user.profilePic,
            }
            let message= await Message.findById(senderChat.chats[friendId.toString()].messageId).select("message createdAt");
            if (message) {
                obj12.chat.message = message.message;
                obj12.chat.createdAt = message.createdAt;
            }
            else {
                obj12.chat.message = "";
                obj12.chat.createdAt = new Date();
            }
            io.to(userSocketMap[req.user.givenId]).emit("updatedChat", obj12);
        }

        // io.to(userSocketMap[req.user.givenId]).emit("updatedChat", obj1.chats);


        res.status(201).json(obj);
    } catch (error) {
        console.log("Error getting messages", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
}

export const sendMessage = async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    // console.log("message",req.body)
    const friendId = id;
    // console.log("friendId",friendId)
    const time1 = performance.now();
    try {
        const friendUser = await User.findOne({ givenId: friendId });
        const newMessage = new Message({
            senderId: req.user.givenId,
            receiverId: friendId,
            message,
        });
        await newMessage.save();
        const time2 = performance.now();

        console.log(`Call to send message took ${(time2 - time1)/1000} milliseconds.`);
        
        // console.log("newMessage", newMessage)
        //sender
        (async()=>{

            let senderChat = await UserChats.findOne({ userChats: req.user.givenId })
            // console.log("senderChat", senderChat)   
        if (!senderChat) {
            // console.log(1)
            senderChat = new UserChats({
                userChats: req.user.givenId,
                chats: {}
            })
            await senderChat.save()
            
        }

        if (!senderChat.chats) {

            senderChat.chats = {}
            }
        // let senderChat=await UserChats.findOne({userChats:req.user.givenId})
        if (!senderChat.chats[friendId]) {
            senderChat.chats[friendId] = {
                messageId: newMessage._id,
                unreadMessages: 0,
                time: newMessage.createdAt,
            }
        }
        else {
            senderChat.set(`chats.${friendId}`, {
                unreadMessages: 0,
                messageId: newMessage._id,
                time: newMessage.createdAt,
            });
        }
        //receiver
        let receiverChat = await UserChats.findOne({ userChats: friendId })
        if (!receiverChat) {
            receiverChat = new UserChats({
                userChats: friendId,
                chats: {}
            })
            await receiverChat.save()
        }
        if (!receiverChat.chats) {
            receiverChat.chats = {}
        }
        if (!receiverChat.chats[req.user.givenId]) {
            receiverChat.chats[req.user.givenId] = {
                messageId: newMessage._id,
                unreadMessages: 1,
                time: newMessage.createdAt,
            }
            receiverChat.markModified('chats');
        }
        else {
            // console.log("HELLO MIHIR I AM SAVING");
            receiverChat.set(`chats.${req.user.givenId}`, {
                unreadMessages: receiverChat.chats[req.user.givenId].unreadMessages + 1,
                messageId: newMessage._id,
                time: newMessage.createdAt,
            });
            // console.log("receiverChat", receiverChat);
        }
        senderChat.markModified('chats');
        await senderChat.save();
        await receiverChat.save();
        
        let time3=performance.now();
        
        console.log(`Call to save chats took ${(time3 - time2)/1000} milliseconds.`);
        
        let obj12={userId:friendId,chat:senderChat.chats[friendId.toString()]};
        obj12.chat.userDetails={
            firstName: friendUser.firstName,
            lastName: friendUser.lastName,
            givenId: friendUser.givenId,
            profilePic: friendUser.profilePic,
        }
        obj12.chat.message=newMessage.message;
        obj12.chat.createdAt=newMessage.createdAt;
        
        let obj22={userId:req.user.givenId,chat:receiverChat.chats[req.user.givenId.toString()]};
        obj22.chat.userDetails={
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            givenId: req.user.givenId,
            profilePic: req.user.profilePic,
        }
        obj22.chat.message=newMessage.message;
        obj22.chat.createdAt=newMessage.createdAt;
        
        const timet=performance.now();
        
        io.to(userSocketMap[friendId]).emit("newMessage", newMessage);
        io.to(userSocketMap[friendId]).emit("updatedChat", obj22);
        io.to(userSocketMap[req.user.givenId]).emit("updatedChat", obj12);
        const time4=performance.now();
        
        console.log(`Call to emit messages took ${(time4 - time3)/1000} milliseconds.`);
        console.log(`Call to emit messages took ${(time4 - timet)/1000} milliseconds.`);
    })();

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error sending message", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateMessages = async (req, res) => {
    const { friendId } = req.params;
    try {
        const user = await User.findOne({ givenId: friendId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const userChat = await UserChats.findOne({ userChats: req.user.givenId });
        if (!userChat) {
            return res.status(404).json({ message: "User chat not found" });
        }
        // console.log("hello",userChat)
        // console.log("friendId",friendId,String(friendId))

        const chat = userChat.chats[String(friendId)];
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        const existingData = userChat.chats[friendId.toString()] || {};

        userChat.set(`chats.${friendId.toString()}`, {
            ...existingData,
            unreadMessages: 0,
        });

        await userChat.save();


        let obj12={userId:friendId,chat:userChat.chats[friendId.toString()]};
            obj12.chat.userDetails={
                firstName: user.firstName,
                lastName: user.lastName,
                givenId: user.givenId,
                profilePic: user.profilePic,
            }
            let message= await Message.findById(userChat.chats[friendId.toString()].messageId).select("message createdAt");
            if (message) {
                obj12.chat.message = message.message;
                obj12.chat.createdAt = message.createdAt;
            }
            else {
                obj12.chat.message = "";
                obj12.chat.createdAt = new Date();
            }
            io.to(userSocketMap[req.user.givenId]).emit("updatedChat", obj12);

        // io.to(userSocketMap[req.user.givenId]).emit("updatedChat", obj1.chats);
        res.status(200).json({ message: "Done" });
        console.log("done")
    } catch (error) {
        console.log("Error getting messages", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAlerts=async (req, res) => {
    try {
        const alerts = await Alerts.find({ user: req.user.givenId }).sort({ createdAt: -1 });
        res.status(200).json(alerts);
    } catch (error) {
        console.log("Error getting alerts", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}



