import { COMPLETE_TASK_FAILURE,COMPLETE_TASK_REQUEST,COMPLETE_TASK_SUCCESS,COMPLETE_TASK_RESET} from "../lib/types";
const initialState = {
    loading: false,
    taskId:null,
    success: false,
};


export default function (state = initialState, action) {
    const {type,payload}=action;
    switch (type) {
        case COMPLETE_TASK_REQUEST:
            return {
                ...state,
                loading: true,
                taskId:payload,
            }
        case COMPLETE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true
            }
        case COMPLETE_TASK_FAILURE:
            return {
                ...state,
                loading: false,
                taskId: null,
                success: false
            }
        case COMPLETE_TASK_RESET:
            return initialState;
        default:
            return state;
    }
}