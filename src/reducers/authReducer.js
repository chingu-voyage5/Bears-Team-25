import * as ACTIONS from "../actions/actionTypes"

export default function authReducer(state = {
    auth: false,
    login: { isFetching: false },
    signUp: { isFetching: false }
}, action) {
    switch (action.type) {
        case ACTIONS.LOGOUT:
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            return {
                ...state,
                auth: false,
                name: null
            }
        case ACTIONS.SET_USER_FROM_LOCALSTORAGE:
            return {
                ...state,
                name: action.name,
                email: action.email,
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
                name: action.name,
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
                name: action.name,
                auth: true
            }
        default:
            return state;
    }
}