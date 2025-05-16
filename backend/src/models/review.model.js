import mongoose from "mongoose";
import User from "./users.model.js";
import Task from "./tasks.model.js";
import Offer from "./offers.model.js";

const ReviewModel = new mongoose.Schema({
    rating: { type: Number, required: true },
    review: { type: String},
    title:{type:String},
    taskId: { type : Number, ref: Task, required: true },
    userId: { type: Number , ref: User, required: true },
    offerId: { type: mongoose.Schema.Types.ObjectId, ref: Offer, required: true},
}, { timestamps: true });

const Review = mongoose.model("Review", ReviewModel);

export default Review;
