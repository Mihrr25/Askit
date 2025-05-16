import {GET_MY_TASKS_FAILURE,GET_MY_TASKS_REQUEST,GET_MY_TASKS_SUCCESS} from "../lib/types";
const initialState = {
    tasks: [],
    loading: true,
}
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_MY_TASKS_SUCCESS:
            return {
                ...state,
                tasks: payload,
                loading: false,
            };
        case GET_MY_TASKS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_MY_TASKS_FAILURE:
            return {
                ...state,
                tasks: [],
                loading: false
            };
        default:
            return state;
    }
}