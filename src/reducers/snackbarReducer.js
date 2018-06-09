import * as ACTIONS from "../actions/actionTypes";

export default function snackbarReducer(state = { open: false }, action) {
  switch (action.type) {
    case ACTIONS.RENDER_SNACKBAR:
      return {
        ...state,
        styling: action.styling,
        text: action.text,
        open: true
      }
    case ACTIONS.CLOSE:
      return {
        ...state,
        open: false
      }
    default:
      return state;
  }
}