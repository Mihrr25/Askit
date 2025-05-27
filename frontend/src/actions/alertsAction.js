import { GET_ALERT_FAILURE,GET_ALERT_REQUEST,GET_ALERT_SUCCESS,GET_ALERT_UPDATE } from "../lib/types";
import { axiosInstance } from "../lib/axios";
import  toast  from "react-hot-toast";

const fetchAlertRequest = () => {
    return {
        type: GET_ALERT_REQUEST
    }
}
const fetchAlertSuccess = (alerts) => {
    return {
        type: GET_ALERT_SUCCESS,
        payload: alerts
    }
}
const fetchAlertFailure = () => {
    return {
        type: GET_ALERT_FAILURE,
    }
}
export const setAlertUpdate = (alert) => {
    return {
        type: GET_ALERT_UPDATE,
        payload: alert
    }
}
export const fetchAlerts = () => async (dispatch, getState) => {
    try {
        dispatch(fetchAlertRequest())
        const { data } = await axiosInstance.get('/messages/getAlerts')
        if(data)dispatch(fetchAlertSuccess(data))
    } catch (error) {
        dispatch(fetchAlertFailure(error.response?.data?.message))
        toast.error("Internal Server Issue")
    }
}