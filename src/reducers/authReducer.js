import * as ACTIONS from "../actions/actionTypes"

export default function authReducer(state = {
    auth: false,
    login: { isFetching: false },
    signUp: { isFetching: false }
}, action) {
    switch (action.type) {
        case ACTIONS.LOGOUT:
            localStorage.removeItem('userEmail');
            return {
                ...state,
                auth: false,
                userEmail: null
            }
        case ACTIONS.SET_USER_FROM_LOCALSTORAGE:
            return {
                ...state,
                userEmail: action.userEmail,
                auth: true
            }
        case ACTIONS.LOGIN:
            return {
                ...state,
                login: { isFetching: true },
            }
        case ACTIONS.LOGIN_FAILURE:
            return {
                ...state,
                login: { isFetching: false, error: action.error, isError: true }
            }
        case ACTIONS.LOGIN_SUCCESS:
            return {
                ...state,
                login: { isFetching: false },
                userEmail: action.userEmail,
                auth: true,
                success: true
            }

        case ACTIONS.SIGN_UP:
            return {
                ...state,
                signUp: { isFetching: true }
            }
        case ACTIONS.SIGN_UP_FAILURE:
            return {
                ...state,
                signUp: { isFetching: false, error: action.error, isError: true }
            }
        case ACTIONS.SIGN_UP_SUCCESS:
            return {
                ...state,
                signUp: { isFetching: false, success: true },
                userEmail: action.userEmail,
                auth: true
            }
        default:
            return state;
    }
}