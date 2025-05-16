import { GET_MESSAGES_FAILURE,GET_MESSAGES_REQUEST,GET_MESSAGES_SUCCESS,SET_MESSAGES_UPDATE,SET_MESSAGES_UPDATE_RESET ,SEND_MESSAGE_FAILURE,SEND_MESSAGE_REQUEST,SEND_MESSAGE_RESET,SEND_MESSAGE_SUCCESS } from "../lib/types";

const initialState = {
    messages:null,
    friendId:null,
    loading: false,
    messageSending:false,
    messageSent:false,
    messageError:false,
    
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_MESSAGES_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_MESSAGES_SUCCESS:
            return {
                ...state,
                messages: payload.messages,
                friendId:payload.friendId,
                loading: false,
            }
        case GET_MESSAGES_FAILURE:
            return {
                ...state,
                loading: false,
                messages:null
            }
        case SET_MESSAGES_UPDATE:
            return {
                ...state,
                messages: {...state.messages, messages:[...state.messages.messages,payload]   }
            }
        case SET_MESSAGES_UPDATE_RESET:
            return {
                ...state,
                messages:null,
                friendId:null
            }
        case SEND_MESSAGE_REQUEST:
            return {
                ...state,
                messageSending:true,
                messageSent:false,
                messageError:false
            }
        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                messageSending:false,
                messageSent:true,
                messageError:false,
            }
        case SEND_MESSAGE_FAILURE:
            return {
                ...state,
                messageSending:false,
                messageSent:false,
                messageError:true,
            }
        case SEND_MESSAGE_RESET:
            return {
                ...state,
                messageSending:false,
                messageSent:false,
                messageError:false,
            } 
        default:
            return state;
    }
}