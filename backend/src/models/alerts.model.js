import mongoose from "mongoose";
import User from "./users.model.js";
import Task from "./tasks.model.js";
const alertSchema = new mongoose.Schema(
    {
        user: {
            type: Number,
            ref: User, // Reference to User model
            required: true,
        },
        alerts:[
            {
                alertType: { 
                  type: String, 
                  enum: ["Offer Accepted","New Offer"],
                  required: true 
                },
                alertDesc: { type: String, required: true },
                taskId: { type: Number, ref: Task, required: true },
                alertTime: { type: Date, default: Date.now },
            },
        ]
    }
);
const Alerts = mongoose.model("Alerts", alertSchema);
export default Alerts