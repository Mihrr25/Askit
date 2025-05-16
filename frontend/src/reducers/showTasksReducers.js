import {GET_TASKS_REQUEST,GET_TASKS_FAILURE,GET_TASKS_SUCCESS,GET_TASKS_RESET} from "../lib/types";
const initialState = {
    tasks: [],
    loading: true,
}
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_TASKS_SUCCESS:
            return {
                ...state,
                tasks: payload,
                loading: false,
            };
        case GET_TASKS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_TASKS_FAILURE:
            return {
                ...state,
                tasks: [],
                loading: false
            };
        case GET_TASKS_RESET:
            return {
                ...state,
                tasks: [],
                loading: true
            };
        default:
            return state;
    }
}