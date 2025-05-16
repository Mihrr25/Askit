import { GET_PARTICULAR_TASK_FAILURE,GET_PARTICULAR_TASK_REQUEST,GET_PARTICULAR_TASK_SUCCESS } from "../lib/types";

const initialState = {
    loading: true,
    task: null
};

export default function (state = initialState, action) {
    const {type,payload}=action;
    switch (type) {
        case GET_PARTICULAR_TASK_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_PARTICULAR_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                task: payload
            }
        case GET_PARTICULAR_TASK_FAILURE:
            return {
                ...state,
                loading: false,
                task: null
            }
        default:
            return state;
    }
}