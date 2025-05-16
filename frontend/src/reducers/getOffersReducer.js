import { GET_OFFERS_FAILURE,GET_OFFERS_REQUEST,GET_OFFERS_UPDATE,GET_OFFERS_SUCCESS} from "../lib/types";
const initialState = {
    loading: false,
    offers: null,
    taskId:null,
};

export default function (state = initialState, action) {
    const {type,payload}=action;
    switch (type) {
        case GET_OFFERS_REQUEST:
            return {
                ...state,
                loading: true,
                taskId:payload
            }
        case GET_OFFERS_SUCCESS:
            return {
                ...state,
                loading: false,
                offers: payload.filter(offer => offer.status !== 'Pending'),
            }
        case GET_OFFERS_FAILURE:
            return {
                ...state,
                loading: false,
                taskId: null
            }
        case GET_OFFERS_UPDATE:
            return {
                ...state,
                loading: false,
                offers: state.offers.filter(offer => offer._id !== action.payload),
            }
        default:
            return state;
    }
}