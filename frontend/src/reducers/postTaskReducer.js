import { use } from "react";
import { POST_TASK_FAILURE,POST_TASK_REQUEST,POST_TASK_RESET,POST_TASK_SUCCESS } from "../lib/types";

const initialState = {
    posting: false,
    task : {
        categoryId: 0,
        categoryName: "",
        description: "",
        title: "",
        specificRequiremetnt: "",
        modeOfTask: "In-Person",
        taskCity: "",
        taskLocation: "",
        dateFlexible: false,
        startDate: "",
        endDate: "",
        timeSlot:"",
        timeFlexible: false,
        budget: 0
    },
    taskId: null,
    taskPosted: false

}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        
        case POST_TASK_RESET:
            return {
                ...state,
                posting: false,
                taskId: null,
                taskPosted: false
            }

        case POST_TASK_REQUEST:
            return {
                ...state,
                posting: true,
            };

        case POST_TASK_SUCCESS:
            return {
                ...state,
                posting: false,
                taskId: payload.taskId,
                taskPosted: true,
            };
        case POST_TASK_FAILURE:
            return {
                ...state,
                posting: false,
                taskId: null,
                taskPosted: false,
            }
            
        default:
            return state;

    }
}