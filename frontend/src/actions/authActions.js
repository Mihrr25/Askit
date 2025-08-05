import { GET_USER_REQUEST,GET_USER_FAILURE,GET_USER_SUCCESS,LOGIN_FAILURE,LOGIN_SUCCESS,LOGIN_REQUEST,LOGOUT, SIGNUP_FAILURE, SIGNUP_SUCCESS } from "../lib/types";
import {axiosInstance} from "../lib/axios";
import { disconnectSocket } from "./socketActions";
import  toast  from "react-hot-toast";

const fetchUserRequest=()=>{
    return {
        type: GET_USER_REQUEST
    }
}
const fetchUserSuccess=user=>{
    return {
        type: GET_USER_SUCCESS,
        payload: user
    }
}
const fetchUserFailure=error=>{
    return {
        type: GET_USER_FAILURE,
        payload: error
    }
}
export const getUser = () => async (dispatch) => {
    try {
        dispatch(fetchUserRequest());

        const response=await axiosInstance.get("/auth/check")
        if(response.status===201){
            dispatch(fetchUserSuccess(response.data));
        }
        else{
            toast.error("No user found")
            dispatch(fetchUserFailure("No user found"));
            // console.log(response);
        }
        
} catch (error) {
    // console.log("motoooo",error);
    if(error.response?.data?.message){
        // console.log("errorMihir",error.response.data.message);
        dispatch(fetchUserFailure(error.response.data.message));
    }
    else dispatch(fetchUserFailure(error.message));
}
}


const loginRequest=()=>{
    return {
        type: LOGIN_REQUEST
    }
}
const loginSuccess=(user)=>{
    return {
        type: LOGIN_SUCCESS,
        payload: user
    }
}
const loginFailure=(error)=>{
    return {
        type: LOGIN_FAILURE,
        payload: error
    }
}
export const login = (user) => async (dispatch) => {
    try {
        dispatch(loginRequest());
       
        const response=await axiosInstance.post("/auth/login",user)
        if(response.status===201){
            dispatch(loginSuccess(response.data));
            toast.success("Login Successful")
        }
        else{
            dispatch(loginFailure("No user found"));
            console.log(response);
            toast.error("No user found")
        }
        
} catch (error) {
    console.log(error);
    if(error.response?.data?.message){
        // console.log("errorMihir",error.response.data.message);
        dispatch(loginFailure(error.response.data.message));
        toast.error(error.response.data.message)
    }
    else {dispatch(loginFailure(error.message));
        toast.error("An error has occurred")
        console.log(error)
    }
}
}

export const googleAuth = (code) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        const response = await axiosInstance.post("/auth/google-login", { code });
        if (response.status === 201) {
            dispatch(loginSuccess(response.data));
            toast.success("Login Successful");
        } else {
            dispatch(loginFailure("No user found"));
            console.log(response);
            toast.error("Please try again");
        }
    } catch (error) {
        console.log(error);
        if (error.response?.data?.message) {
            dispatch(loginFailure(error.response.data.message));
            toast.error(error.response.data.message);
        } else {
            dispatch(loginFailure(error.message));
            toast.error("Internal Server Error");
        }
    }
}

const signupRequest=()=>{
    return {
        type: SIGNUP_FAILURE
    }
}
const signupSuccess=(user)=>{
    return {
        type: SIGNUP_SUCCESS,
        payload: user
    }
}
const signupFailure=(error)=>{
    return {
        type: SIGNUP_FAILURE,
        payload: error
    }
}

export const signup = (user) => async (dispatch) => {
    console.log("12222",user);
    try {
        dispatch(signupRequest());
        console.log(user);
        
        const response =await axiosInstance.post("/auth/signup",user)
        if(response.status===201){
            dispatch(signupSuccess(response.data));
            toast.success("Signup Successful")
        }
        else{
            dispatch(signupFailure(response.data.message?response.data.message:"Internal Server Issue"));
            toast.error(response.data.message?response.data.message:"Internal Server Issue")
        }
        
} catch (error) {
    // console.log(error);
    if(error.response?.data?.message){
        // console.log("errorMihir",error.response.data.message);
        dispatch(signupFailure(error.response.data.message));
        toast.error(error.response.data.message)
    }
    else{ dispatch(signupFailure(error.message));
        toast.error("Internal Server Error")
    }
}
}



export const logout = () => async (dispatch) => {
    try{
        await axiosInstance.post("/auth/logout");
        disconnectSocket();
        dispatch({
            type: LOGOUT
        })
    }
    catch(error){
        console.log(error);
    }
   
}
export const updateUser = async (user)=>{
    try{ let response = await axiosInstance.put("/auth/update-profile",user);
    if(response.status==200){
        return response.data;
    }
    else return null
    }
    catch{
        return null
    }
    
}