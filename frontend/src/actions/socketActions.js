import { SOCKET_CONNECTED,SOCKET_DISCONNECTED} from "../lib/types";
import {io} from 'socket.io-client';
import {setChatsUpdate,setMessagesUpdate} from './messagesActions';
import { axiosInstance } from "../lib/axios";
import  toast  from "react-hot-toast";

let socket=null;

export const connectSocket =()=> (dispatch,getState) => {
    try {
        socket = io(import.meta.env.VITE_BASE_URL,{withCredentials:true})
        socket.on("connect", () => {
            console.log("✅ Socket Connected:", socket.id);
            dispatch({
                type: SOCKET_CONNECTED,
                payload: socket.id 
            });
        });
        socket.on("disconnect", () => {
            console.log("User disconnected");
            dispatch({
                type: SOCKET_DISCONNECTED
            })
        });
        socket.on("updatedChat", (data) => {
            console.log("Updated Chats", data);
            dispatch(setChatsUpdate(data))
        });
        socket.on("newMessage", (data) => {
            let state=getState();
            console.log("New Message", data);
            console.log(state.message.friendId , data.senderId.toString());
            if (state.message.friendId != data.senderId.toString()) {
                // User is in a different chat → show notification
                toast("New Message Received", {
                    icon: "📩",
                    duration: 5000,
                });
            } else {
                // User is actually viewing this chat → mark messages as read
                dispatch(setMessagesUpdate(data));
                axiosInstance
                .get(`/messages/update/${data.senderId}`)
                .catch(err => console.error("Failed to update messages", err))
                .finally(() => console.log("Message update request completed"))
            }
        });

        socket.on("getOnlineUsers", (data) => {
            console.log("Online Users", data);
            dispatch({
                type: "SET_ONLINE_USERS",
                payload: data
            })
        });
        socket.on("newAlert", (data) => {
            console.log("New Alert", data);
            dispatch({
                type: "GET_ALERT_UPDATE",
                payload: data
            })
            toast(`${data.alertType}`,{
                icon:"💼",
                duration: 5000,
            })
            
        });
    } catch (error) {
        
    }
    
}

export const disconnectSocket = () => (dispatch, getState) => {
    if (socket&&socket.connected) {
        socket.disconnect();
        console.log("Socket disconnected");
    }
    dispatch({
        type: SOCKET_DISCONNECTED
    })
}

export const getSocket=()=>socket;