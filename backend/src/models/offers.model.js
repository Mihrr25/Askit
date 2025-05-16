import mongoose from "mongoose";
import User from "./users.model.js";
import Task from "./tasks.model.js";

const offerSchema = new mongoose.Schema({
    status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    taskId: { type : Number, ref: Task, required: true },
    offerGivenBy: { type: Number , ref: User, required: true }
}, { timestamps: true });

const Offer = mongoose.model("Offer", offerSchema);

export default Offer
