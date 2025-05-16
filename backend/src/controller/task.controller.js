import Task from "../models/tasks.model.js"
// import TaskId from "../models/taskId.model.js"
import User from "../models/users.model.js"
import bcrypt from "bcryptjs"
import mongoose from "mongoose"
import {sameUser} from "../lib/utils.js"
import Offer from "../models/offers.model.js"
import Review from "../models/review.model.js"

export const postTask = async (req, res) => {
    try {
        const givenId = await Task.find().countDocuments() + 10000001;
        const {
            categoryId,
            categoryName,
            description, // Fixed capitalization
            title,
            specificRequirement,
            modeOfTask,
            taskCity,
            taskLocation,
            dateFlexible,
            startDate,
            endDate,
            timeSlot,
            timeFlexible,
            budget,
        } = req.body;
        const newTask = new Task({
            categoryId,
            categoryName,
            description,
            title,
            specificRequirement,
            modeOfTask,
            taskCity,
            taskLocation,
            dateFlexible,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            timeSlot,
            timeFlexible,
            budget: parseInt(budget, 10),
            TaskPosterId: req.user.givenId,
            givenId,
        });
        const user=await User.findOne({givenId:req.user.givenId});
        user.tasksPosted=(user.tasksPosted?user.tasksPosted:0)+1;
        await user.save();
        await newTask.save();
        res.status(201).json({ taskId: newTask._id });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find({ Status: "Open" }).sort({ createdAt: -1 });
        // const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ givenId: req.params.id });
        const taskPoster = task.TaskPosterId;
        let poster;
        
        if (taskPoster != req.user.givenId && task.Status != "Open" && task.UserAcceptedOffer != req.user.givenId) {
            return res.status(400).json({ message: "You are not authorized to view this task" });
        }

        
            // Otherwise, search by givenId
            poster = await User.findOne({ givenId: taskPoster }).select("-password");
        let obj={
            task,
            postedBy: {
              givenId: poster.givenId,
              firstName: poster.firstName,
              lastName: poster.lastName,
              profilePic: poster.profilePic,
            },
            
          }
        if((task.TaskPosterId==req.user.givenId||task.UserAcceptedOffer==req.user.givenId)&&task.OfferIdAccepted){
            const offer=await Offer.findOne({_id:task.OfferIdAccepted});
            const offerUser=await User.findOne({givenId:offer.offerGivenBy}).select("-password");

            obj={
                ...obj,
                offer:{
                    description:offer.description,
                    price:offer.price,
                    offeredBy:offerUser.firstName+" "+offerUser.lastName,
                    profilePic:offerUser.profilePic,
                    givenId:offerUser.givenId,
                    offerAcceptedDate:offer.updatedAt,
                },
            };
        }
        res.status(200).json(obj);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const completeTask = async (req, res) => {
    try {
        // return res.status(200).json({ message: "Task Completed" });
        const {rating,title,description}=req.body;
        const task = await Task.findOne({ givenId: req.params.id });
        const offer=await Offer.findOne({_id:task.OfferIdAccepted});    
        const user=await User.findOne({givenId:offer.offerGivenBy});
        if(!task){
            return res.status(400).json({ message: "Task not found" });
        }
        if(!offer){
            return res.status(400).json({ message: "Offer not found" });
        }

        if (task.TaskPosterId == req.user.givenId) {
            if(task.Status=="Completed"){
                return res.status(400).json({ message: "Task already completed" });
            }
            if(task.Status!="In-Progress"){
                return res.status(400).json({ message: "Task not in progress" });
            }
            task.Status="Completed";
            task.completedDate=new Date();
            user.UserRating=((user.UserRating?user.UserRating:0)*(user.tasksAccepted?user.tasksAccepted:0)+rating)/((user.tasksAccepted?user.tasksAccepted:0)+1);
            user.tasksAccepted=(user.tasksAccepted?user.tasksAccepted:0)+1;
            const newReview=new Review({
                rating,
                title,
                review:description,
                userId:offer.offerGivenBy,
                taskId:task.givenId,
                offerId:offer._id,
            });
            await newReview.save();
            await user.save();
            await task.save();
            res.status(200).json({ message: "Task Completed" });
        } else {
            res.status(400).json({ message: "You are not authorized to complete this task" });
        }
    } catch (error) {
        console.log("error");
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMyTask = async (req, res) => {
    try {
        const tasks = await Task.find({
            $or: [
                { TaskPosterId: req.user.givenId },
                { UserAcceptedOffer: req.user.givenId }
            ]
        }).sort({ createdAt: -1 });
        
        res.status(200).json(tasks);
        
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const temp = async (req, res) => {
    try {
        // let nextGivenId = 10000001;
        // // const Users = await User.find();
        // const Tasks= await Task.find();;
        // for (const user of Tasks) {
        //     await Task.findByIdAndUpdate(user._id, { TaskPosterId: 10000001 });
        // }
        let password="1234";
        const salt = await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt);
        const users = await User.find();
        for(const user of users){
            await User.findByIdAndUpdate(user._id, { password: hashedPassword });
        }
        res.status(200).json(users);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};