import { use } from "react";
import { GET_USER_REQUEST, GET_USER_FAILURE, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_REQUEST, LOGOUT, SIGNUP_FAILURE, SIGNUP_SUCCESS, SIGNUP_REQUEST } from "../lib/types";

const initialState = {
    isAuthenticated: null,
    loading: true,
    user: null,
    loginLoading: false,
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };
        case GET_USER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_USER_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        case LOGIN_SUCCESS:

            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                loginLoading: false,
                user: payload
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                loginLoading: false,
                user: null
            };
        case LOGIN_REQUEST:
            return {
                ...state,
                loginLoading: true
            };
        case SIGNUP_REQUEST:
            return {
                ...state,
                loading: true
            };
        case SIGNUP_FAILURE:
            return {
                ...state,
                isAuthenticated: true,
                loading: false
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };
        case LOGOUT:

            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        default:
            return state;

    }
}