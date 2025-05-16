import mongoose from "mongoose";
import User from "./users.model.js";

const taskSchema = new mongoose.Schema({
    categoryId: { type: Number , required: true },
    givenId: { type: Number, unique: true, required: true },
    categoryName: { type: String, required: true },
    description: { type: String, required: true },
    title: { type: String, required: true },
    specificRequirement: { type: String },
    modeOfTask: { type: String, required: true },
    taskCity: { type: String },
    taskLocation: { type: String },
    dateFlexible: { type: Boolean, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    timeSlot: { type: String },
    timeFlexible: { type: Boolean, required: true },
    budget: { type: Number, required: true },
    TaskPosterId: { type: Number, ref: User, required: true },
    Status: { type: String, default: "Open" },
    OfferIdAccepted: { type: mongoose.Schema.Types.ObjectId, ref: "Offer" },
    UserAcceptedOffer: { type: Number, ref:User },
    completedDate: { type: Date },
    offers:{type: Number,default:0},
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

Task.collection.createIndex({ givenId: 1 }, { unique: true })
  .then(() => console.log("Unique index added to givenId"))
  .catch(err => console.error("Error creating index:", err));

export default Task;
