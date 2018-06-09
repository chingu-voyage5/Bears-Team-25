import * as ACTIONS from "../actions/actionTypes";

export default function accountDeletionReducer(state = { isFetching: false }, action) {
  switch (action.type) {
    case ACTIONS.ACCOUNT_DELETION:
      return {
        ...state,
        isFetching: true
      }
    case ACTIONS.ACCOUNT_DELETION_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case ACTIONS.ACCOUNT_DELETION_SUCCESS:
      return {
        ...state,
        isFetching: false,
      }
    default:
      return state;
  }
}