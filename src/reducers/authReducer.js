import * as ACTIONS from "../actions/actionTypes"

export default function authReducer(state = {
    auth: false,
    login: { isFetching: false },
    signUp: { isFetching: false },
    profileSettings: {isFetching: false},
    isFBLinked: false,
    isGoogleLinked: false
}, action) {
    switch (action.type) {
        case ACTIONS.UNLINK_FB:
        console.log('unling fb')
        return {
          ...state,
          isFBLinked: false
        }
        case ACTIONS.UNLINK_GOOGLE:
         return {
          ...state,
          isGoogleLinked: false
        }
        case ACTIONS.LOGOUT:
        localStorage.removeItem('name');
            return {
                ...state,
                name: null,
                email: null,
                isFBLinked: false,
                isGoogleLinked: false
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
        case ACTIONS.SET_USERS_CREDENTIALS:
            return {
                ...state,
                login: { isFetching: false },
                signUp: {isFetching: false},
                name: action.name,
                email: action.email,
                isFBLinked: action.isFBLinked,
                isGoogleLinked: action.isGoogleLinked,
                isSlackToken: action.isSlackToken,
                isGmailToken: action.isGmailToken,
                isGithubToken: action.isGithubToken,
                isTrelloToken: action.isTrelloToken,
                auth: action.auth,
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
        case ACTIONS.CHANGING_EMAIL:
            return {
              ...state,
              profileSettings: { isFetching: true},
              email: action.email
            }
        case ACTIONS.CHANGING_EMAIL_FAILURE:
            return {
              ...state,
              profileSettings: { isFetching: false, error: action.error },
            }
          case ACTIONS.CHANGING_EMAIL_SUCCESS:
            return {
              ...state,
              profileSettings: { isFetching: false, error: action.error },
            }
        default:
            return state;
    }
}