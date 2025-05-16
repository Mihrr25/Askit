import { POST_OFFER_FAILURE,POST_OFFER_REQUEST,POST_OFFER_SUCCESS,POST_OFFER_RESET } from "../lib/types";
const initialState = {
    loading: false,
    offer: null,
};

export default function (state = initialState, action) {
    const {type,payload}=action;
    switch (type) {
        case POST_OFFER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case POST_OFFER_SUCCESS:
            return {
                ...state,
                loading: false,
                offer : payload
            }
        case POST_OFFER_FAILURE:
            return {
                ...state,
                loading: false,
                offer: null
            }
        case POST_OFFER_RESET:
            return {
                ...state,
                loading: false,
                offer: null
            }
        default:
            return state;
    }
}