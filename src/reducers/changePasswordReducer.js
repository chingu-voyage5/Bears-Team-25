import * as ACTIONS from "../actions/actionTypes"


export default function changePasswordReducer(state = { isFetching: false }, action) {
  switch (action.type) {
    case ACTIONS.SUCCESS_OFF:
      return {
        ...state,
        success: false
      }
    case ACTIONS.CHANGING_PASS:
      return {
        ...state,
        isFetching: true
      }
    case ACTIONS.CHANGING_PASS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case ACTIONS.CHANGING_PASS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true
      }
    default:
      return state;
  }
}