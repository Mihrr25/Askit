import mongoose from "mongoose";
import User from "./users.model.js";
import Message from "./messages.model.js";

const userChatsSchema = new mongoose.Schema({
    userChats: { type: Number, ref: User, required: true },
    chats: Object,
            // friendId: { type: Number, ref: User, required: true },
            // messageId: { type: mongoose.Schema.Types.ObjectId, ref: Message, required: true },
            // unreadMessages: { type: Number, default: 0 }
        
    
}, { timestamps: true });

const UserChats = mongoose.model("UserChats", userChatsSchema);

export default UserChats;
