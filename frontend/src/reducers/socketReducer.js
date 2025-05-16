import { SOCKET_DISCONNECTED,SOCKET_CONNECTED } from "../lib/types";

const initialState ={
    socket:null,
    isConnected:false,
}
export default function (state = initialState, action) {
    const {type,payload}=action;
    switch (type) {
        case SOCKET_CONNECTED:
            return {
                ...state,
                socket:payload,
                isConnected:true,
            }
        case SOCKET_DISCONNECTED:
            return {
                ...state,
                socket:null,
                isConnected:false
            }
        
        default:
            return state;
    }
}