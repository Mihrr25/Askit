import mongoose from "mongoose";
import User from "./users.model.js";

const messageSchema = new mongoose.Schema({
    senderId: { type: Number, ref: User, required: true },
    receiverId: { type: Number, ref: User, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);

export default Message;
