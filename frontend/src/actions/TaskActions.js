import {axiosInstance} from "../lib/axios";
import { POST_TASK_FAILURE,POST_TASK_REQUEST,POST_TASK_SUCCESS,POST_TASK_RESET,GET_TASKS_FAILURE,GET_TASKS_REQUEST,GET_TASKS_RESET,GET_TASKS_SUCCESS,GET_PARTICULAR_TASK_FAILURE,GET_PARTICULAR_TASK_REQUEST,GET_PARTICULAR_TASK_SUCCESS,COMPLETE_TASK_FAILURE,COMPLETE_TASK_REQUEST,COMPLETE_TASK_SUCCESS,GET_MY_TASKS_FAILURE,GET_MY_TASKS_REQUEST,GET_MY_TASKS_SUCCESS } from "../lib/types";
import toast from "react-hot-toast";
const postTaskRequest=()=>{
    return {
        type: POST_TASK_REQUEST
    }
};
const postTaskSuccess=(id)=>{
    return {
        type: POST_TASK_SUCCESS,
        payload: id
    }
}
const postTaskFailure=()=>{
    return {
        type: POST_TASK_FAILURE
    }
}
export const postTaskReset=()=>{
    return {
        type: POST_TASK_RESET
    }
}
export const postTask = (task) => async (dispatch) => {
    try {
        dispatch(postTaskRequest());

        const response=await axiosInstance.post("/task/post",task)
        if(response.status===201){
            dispatch(postTaskSuccess(response.data));
            toast.success("Task posted successfully")
        }
        else{
            dispatch(postTaskFailure());
            toast.error("Task posting failed")
        }
        
} catch (error) {
    console.log(error)
    dispatch(postTaskFailure());
    toast.error("Task posting failed")
}
}

export const getTasksReset=()=>{
    return {
        type: GET_TASKS_RESET
    }
}
export const getTasksRequest=()=>{
    return {
        type: GET_TASKS_REQUEST
    }
}
export const getTasksSuccess=(tasks)=>{
    return {
        type: GET_TASKS_SUCCESS,
        payload: tasks
    }
}
export const getTasksFailure=()=>{
    return {
        type: GET_TASKS_FAILURE
    }
}

export const getTasks = () => async (dispatch) => {
    try {
        dispatch(getTasksRequest());

        const response=await axiosInstance.get("/task/allTasks")
        if(response.status===200){
            dispatch(getTasksSuccess(response.data));
        }
        else{
            dispatch(getTasksFailure());
        }
        
} catch (error) {
    console.log(error)
    dispatch(postTaskFailure());
}
}

export const getParticularTaskRequest=()=>{
    return {
        type: GET_PARTICULAR_TASK_REQUEST
    }
}
export const getParticularTaskSuccess=(task)=>{
    return {
        type: GET_PARTICULAR_TASK_SUCCESS,
        payload: task
    }
}
export const getParticularTaskFailure=()=>{
    return {
        type: GET_PARTICULAR_TASK_FAILURE
    }
}

export const getParticularTask = (id) => async (dispatch) => {
    try {
        dispatch(getParticularTaskRequest());

        const response=await axiosInstance.get(`/task/particularTask/${id}/`)
        if(response.status===200){
            dispatch(getParticularTaskSuccess(response.data));
        }
        else{
            dispatch(getParticularTaskFailure());
        }
        
} catch (error) {
    console.log(error)
    dispatch(getParticularTaskFailure());
}
}

const completeTaskRequest=(payload)=>{
    return {
        type: COMPLETE_TASK_REQUEST,
        payload
    }
};
const completeTaskSuccess=()=>{
    return {
        type: COMPLETE_TASK_SUCCESS
    }
}
const completeTaskFailure=()=>{
    return {
        type: COMPLETE_TASK_FAILURE
    }
}
export const completeTask = (id,obj) => async (dispatch) => {
    try {
        dispatch(completeTaskRequest(id));

        const response=await axiosInstance.post(`/task/completeTask/${id}`,obj)
        if(response.status===200){
            dispatch(completeTaskSuccess());
            toast.success("Task Completed")
        }
        else{
            dispatch(completeTaskFailure());
            console.log(response.status)
            toast.error("Task Completion Failed")
        }
        
} catch (error) {
    console.log(error)
    console.log(error.response)
    dispatch(completeTaskFailure());
    toast.error("Task Completion Failed")
}
}

export const getMyTasksRequest=()=>{
    return {
        type: GET_MY_TASKS_REQUEST
    }
}

export const getMyTasksSuccess=(tasks)=>{
    return {
        type: GET_MY_TASKS_SUCCESS,
        payload: tasks
    }
}

export const getMyTasksFailure=()=>{
    return {
        type: GET_MY_TASKS_FAILURE
    }
}

export const getMyTasks=()=>async(dispatch)=>{
    try {
        dispatch(getMyTasksRequest());

        const response=await axiosInstance.get("/task/myTasks");
        if(response.status===200){
            dispatch(getMyTasksSuccess(response.data));
        }
        else{
            dispatch(getMyTasksFailure());
        }
    } catch (error) {
        console.log(error);
        dispatch(getMyTasksFailure());
    }
}

