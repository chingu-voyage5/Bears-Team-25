import * as ACTIONS from "../actions/actionTypes"

export default function authReducer(state = {
    auth: false,
    login: { isFetching: false },
    signUp: { isFetching: false },
    emailChanging: {isFetching: false}
}, action) {
    switch (action.type) {
        case ACTIONS.LOGOUT:
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            return {
                ...state,
                name: null,
                email: null
            }
        case ACTIONS.LOGOUT_SUCCESS:
            return {
                ...state,
                auth: false
            }
        case ACTIONS.LOGOUT_FAILURE:
            return {
                ...state,
                auth: false
            }    
        case ACTIONS.SET_USER_FROM_LOCALSTORAGE:
        if (action.name){
            return {
                ...state,
                name: action.name,
                email: action.email,
                auth: true
            }
        }
        else {
            return {
                ...state,
                auth: false
            }
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
                email: action.email,
                auth: true,
                success: true,
                
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
                email: action.email,
                auth: true
            }
        case ACTIONS.CHANGING_EMAIL:
            return {
              ...state,
              emailChanging: { isFetching: true},
              email: action.email
            }
        case ACTIONS.CHANGING_EMAIL_FAILURE:
            return {
              ...state,
              emailChanging: { isFetching: false, error: action.error },
            }
          case ACTIONS.CHANGING_EMAIL_SUCCESS:
            return {
              ...state,
              emailChanging: { isFetching: false, error: action.error },
            }
        default:
            return state;
    }
}