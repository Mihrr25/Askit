import {axiosInstance} from "../lib/axios";
import { getParticularTask } from "./TaskActions";
import { POST_OFFER_FAILURE,POST_OFFER_REQUEST,POST_OFFER_SUCCESS , POST_OFFER_RESET,GET_OFFERS_FAILURE,GET_OFFERS_REQUEST,GET_OFFERS_UPDATE,GET_OFFERS_SUCCESS,UPDATE_OFFER_FAILURE,UPDATE_OFFER_REQUEST,UPDATE_OFFER_SUCCESS} from "../lib/types";
import  toast  from "react-hot-toast";

const postOfferRequest=()=>{
    return {
        type: POST_OFFER_REQUEST
    }
};
const postOfferSuccess=(offer)=>{
    return {
        type: POST_OFFER_SUCCESS,
        payload: offer
    }
}

const postOfferFailure=()=>{
    return {
        type: POST_OFFER_FAILURE
    }
}
export const postOfferReset=()=>{
    return {
        type: POST_OFFER_RESET
    }
}

export const postOffer = (offer,id) => async (dispatch) => {
    try {
        dispatch(postOfferRequest());
        const response=await axiosInstance.post(`/offer/post/${id}`,offer)
        if(response.status===201){
            dispatch(postOfferSuccess(response.data));
            toast.success("Offer posted successfully")
        }
        else{
            dispatch(postOfferFailure());
            toast.error("Offer posting failed")
        }
        
} catch (error) {
    console.log(error)
    dispatch(postOfferFailure());
    toast.error("Offer posting failed")
}
}

const getOfferRequest=(id)=>{
    return {
        type: GET_OFFERS_REQUEST,
        payload:id
    }
};

const getOfferSuccess=(offers)=>{
    return {
        type: GET_OFFERS_SUCCESS,
        payload: offers
    }
}

const getOfferFailure=()=>{
    return {
        type: GET_OFFERS_FAILURE
    }
}
export const getOfferUpdate=(id)=>{
    return {
        type: GET_OFFERS_UPDATE,
        payload:id
    }
}

export const getOffers = (id) => async (dispatch) => {
    try {
        dispatch(getOfferRequest(id));
        const response=await axiosInstance.get(`/offer/allOffers/${id}`)
        if(response.status===200){
            dispatch(getOfferSuccess(response.data));
        }
        else{
            dispatch(getOfferFailure());
        }
        
} catch (error) {
    console.log(error)
    dispatch(getOfferFailure());
}
}

const updateOfferRequest=(payload)=>{
    return {
        type: UPDATE_OFFER_REQUEST,
        payload
    }
};
const updateOfferSuccess=()=>{
    return {
        type: UPDATE_OFFER_SUCCESS,
    }
}

const updateOfferFailure=()=>{
    return {
        type: UPDATE_OFFER_FAILURE
    }
}
export const updateOffer = (status,offerId,taskId) => async (dispatch) => {
    try {
        dispatch(updateOfferRequest({offerId,taskId}));
        const response=await axiosInstance.post(`/offer/update/${taskId}/${offerId}`,{status})
        if(response.status===200){
            dispatch(updateOfferSuccess());
            dispatch(getOfferUpdate(offerId))
            toast.success("Offer updated successfully")
            if(status==="Accepted"){
                dispatch(getParticularTask(taskId));
            }
        }
        else{
            dispatch(updateOfferFailure());
            toast.error("Offer updating failed")
        }
        
} catch (error) {
    console.log(error)
    dispatch(updateOfferFailure());
    toast.error("Offer updating failed")
}
}


