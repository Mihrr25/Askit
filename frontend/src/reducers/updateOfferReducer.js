import { UPDATE_OFFER_FAILURE,UPDATE_OFFER_REQUEST,UPDATE_OFFER_SUCCESS} from "../lib/types";
const initialState = {
    loading: false,
    offerId: null,
    taskId:null,
};


export default function (state = initialState, action) {
    const {type,payload}=action;
    switch (type) {
        case UPDATE_OFFER_REQUEST:
            return {
                ...state,
                loading: true,
                taskId:payload.taskId,
                offerId: payload.offerId
            }
        case UPDATE_OFFER_SUCCESS:
            return {
                ...state,
                loading: false,
                offers : payload,
            }
        case UPDATE_OFFER_FAILURE:
            return {
                ...state,
                loading: false,
                taskId: null,
                offerId:null
            }
        default:
            return state;
    }
}