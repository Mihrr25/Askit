import Task from "../models/tasks.model.js"
// import TaskId from "../models/taskId.model.js"
import User from "../models/users.model.js"
import mongoose from "mongoose"
import Offer from "../models/offers.model.js"
import {sameUser,saveAlert} from "../lib/utils.js"
import { io, userSocketMap } from "../lib/socket.js"


export const postOffer = async (req, res) => {
    try {
        const {
            price,
            description,
            taskId,
        } = req.body;
        if(!price || !description || !taskId){
            return res.status(400).json({message:"Please provide all the fields"})
        }
        if(sameUser(taskId,req.user.givenId)===1){
            return res.status(400).json({message:"You can't give offer on your own task"})
        }
        if(sameUser(taskId,req.user.givenId)===0){
            return res.status(400).json({message:"Task not found"})
        }
        let task = await Task.findOne({ givenId: taskId });
        if (!task) {
            return res.status(400).json({ message: "Task not found" });
        }


        const newOffer = new Offer({
            price: parseInt(price, 10),
            description,
            taskId,
            offerGivenBy: req.user.givenId,
        });
        task.offers=(task.offers?task.offers:0)+1;
        const alertObj={
            alertType:"New Offer",
            alertDesc:`You have received a new offer of ${price} for your task`,
        }
        const alert=await saveAlert(alertObj,task.TaskPosterId,taskId);
        
        await task.save();
        await newOffer.save();
        res.status(201).json({ offerId: newOffer._id });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const getOffers = async (req, res) => {
    try {
        const id = req.params.id;
        const check=await sameUser(id,req.user.givenId)
        if(!id){
            return res.status(400).json({message:"Please provide all the fields"})
        }
        if(check==1){
            const offers = await Offer.find({ taskId: id });
            let resp=[];
            for(let i=0;i<offers.length;i++){
                const user=await User.findOne({givenId:offers[i].offerGivenBy})
                resp.push({
                    description:offers[i].description,
                    price:offers[i].price,
                    offeredByName:user.firstName+" "+user.lastName,
                    offeredBySkills:user.skills,
                    userRating:user.UserRating,
                    userCity:user.city,
                    userProfile:user.profilePicture,
                    userGivenId:user.givenId,
                    _id:offers[i]._id,
                })
            }
            res.status(200).json(resp);
        }
        else return res.status(400).json({ message: "Not Authorized" });
    } catch (error) {
        console.log("hello")
        console.log("error", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const updateOffer = async (req, res) => {
    try {
        const { status } = req.body;
        const offerId = req.params.offerId;
        const taskId = req.params.taskId;
        console.log(req.body)
        if(!status || !offerId || !taskId){
            return res.status(400).json({message:"Please provide all the fields"})
        }
        const check=await sameUser(taskId,req.user.givenId)
        if(check==1){

            const offer = await Offer.findOne({ _id: offerId });
            if (!offer) {
                return res.status(400).json({ message: "Offer not found" });
            }
            if(status==="Accepted"){
                const task=await Task.findOne({givenId:taskId})
                task.OfferIdAccepted=offerId;
                task.UserAcceptedOffer=offer.offerGivenBy;
                task.Status="In-Progress"
                const user=await User.findOne({givenId:task.TaskPosterId}).select("firstName lastName")
                const alertObj={
                    alertType:"Offer Accepted",
                    alertDesc:`Your offer has been accepted by ${user.firstName} ${user.lastName}`,
                }
                const alert=await saveAlert(alertObj,offer.offerGivenBy,taskId);

                await task.save();
            }
            offer.status = status;
            await offer.save();
            res.status(200).json({ message: "Offer Updated" });
        }
        else return res.status(400).json({ message: "Not Authorized" });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

