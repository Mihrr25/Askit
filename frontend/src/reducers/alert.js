import { GET_ALERT_FAILURE,GET_ALERT_REQUEST,GET_ALERT_SUCCESS,GET_ALERT_UPDATE} from '../lib/types';

const initialState ={
    loading:false,
    alerts:[],
    success:false,
}

export default function(state = initialState, action){
    const { type, payload } = action;
    // if (payload){
    //     if(type===GET_ALERT_SUCCESS && !payload.alerts){
    //         payload.alerts = []
    //     }
    // }

    switch(type){
        case GET_ALERT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_ALERT_SUCCESS:
            return {
                ...state,
                loading: false,
                alerts: payload[0].alerts,
                success: true,
            };
        case GET_ALERT_FAILURE:
            return {
                ...state,
                loading: false,
                alerts: [],
                success: false,
            };
        case GET_ALERT_UPDATE:
            return {
                ...state,
                alerts:[...state.alerts,payload]
            };
        default:
            return state;
    }
}