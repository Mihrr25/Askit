import { GET_CHATS_FAILURE,GET_CHATS_REQUEST,GET_CHATS_SUCCESS,SET_CHATS_UPDATE,SET_ONLINE_USERS } from "../lib/types";

const initialState = {
    chats:null,
    loading: false,
    onlineUsers:[],
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CHATS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_CHATS_SUCCESS:
            return {
                ...state,
                chats: payload,
                loading: false,
            }
        case GET_CHATS_FAILURE:
            return {
                ...state,
                loading: false,
                chats:null
            }
        case SET_CHATS_UPDATE:
            if (!payload.userId) return state;
            return {
                ...state,
                chats:{...state.chats,[payload.userId]:payload.chat}
            }
        case SET_ONLINE_USERS:
            return {
                ...state,
                onlineUsers:payload
            }
        default:
            return state;
    }
}