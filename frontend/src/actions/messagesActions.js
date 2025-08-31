import { GET_CHATS_REQUEST, GET_CHATS_FAILURE, GET_CHATS_SUCCESS, SET_CHATS_UPDATE, GET_MESSAGES_FAILURE, GET_MESSAGES_REQUEST, GET_MESSAGES_SUCCESS, SET_MESSAGES_UPDATE, SET_MESSAGES_UPDATE_RESET, SEND_MESSAGE_FAILURE, SEND_MESSAGE_REQUEST, SEND_MESSAGE_RESET, SEND_MESSAGE_SUCCESS } from "../lib/types";

import { axiosInstance } from "../lib/axios";

const fetchChatsRequest = () => {
    return {
        type: GET_CHATS_REQUEST
    }
}
const fetchChatsSuccess = chats => {
    return {
        type: GET_CHATS_SUCCESS,
        payload: chats
    }
}
const fetchChatsFailure = error => {
    return {
        type: GET_CHATS_FAILURE,
    }
}
export const setChatsUpdate = chats => {
    return {
        type: SET_CHATS_UPDATE,
        payload: chats
    }
}
export const fetchChats = () => async (dispatch, getState) => {
    try {
        try {
            dispatch(fetchChatsRequest())
            const { data } = await axiosInstance.get('/messages/getChats')
            dispatch(fetchChatsSuccess(data))
        } catch (error) {
            dispatch(fetchChatsFailure(error.response.data.message))
        }
    }
    catch (error) {
        console.log(error)
    }
}

const fetchMessagesRequest = () => {
    return {
        type: GET_MESSAGES_REQUEST
    }
}
const fetchMessagesSuccess = (messages, friendId) => {
    return {
        type: GET_MESSAGES_SUCCESS,
        payload: { messages, friendId }
    }
}
const fetchMessagesFailure = error => {
    return {
        type: GET_MESSAGES_FAILURE,
    }
}
export const setMessagesUpdate = message => {
    return {
        type: SET_MESSAGES_UPDATE,
        payload: message
    }
}
export const setMessagesUpdateReset = () => {
    return {
        type: SET_MESSAGES_UPDATE_RESET,
    }
}

export const fetchMessages = (friendId) => async (dispatch, getState) => {
    try {

        try {
            dispatch(fetchMessagesRequest())
            const { data } = await axiosInstance.get(`/messages/getMessages/${friendId}`)
            dispatch(fetchMessagesSuccess(data, friendId))
        } catch (error) {
            dispatch(fetchMessagesFailure(error.response.data.message))
            console.log(error.response.data.message)
        }
    }
    catch {
        console.log(error)
    }
}

const sendMessageRequest = () => {
    return {
        type: SEND_MESSAGE_REQUEST
    }
}

const sendMessageSuccess = (data) => {
    return {
        type: SEND_MESSAGE_SUCCESS,
        payload: data
    }
}
const sendMessageFailure = error => {
    return {
        type: SEND_MESSAGE_FAILURE,
    }
}
export const sendMessageReset = () => {
    return {
        type: SEND_MESSAGE_RESET,
    }
}
export const sendMessage = (friendId, message) => async (dispatch, getState) => {
    try {

        try {
            dispatch(sendMessageRequest())
            // console.log("message", message)
            const { data } = await axiosInstance.post(`/messages/sendMessage/${friendId}`, {message})
            dispatch(sendMessageSuccess(data))
            dispatch(setMessagesUpdate(data))
        } catch (error) {
            dispatch(sendMessageFailure(error.response.data.message))
            console.log(error.response.data.message)
        }
    }
    catch(error) {
        console.log(error)
    }
}