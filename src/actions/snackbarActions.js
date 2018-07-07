import * as ACTIONS from "./actionTypes";

export function closeSnackbar() {
  return {
    type: ACTIONS.CLOSE
  };
}

function socialError(message) {
  return {
    type: ACTIONS.RENDER_SNACKBAR,
    styling: "error",
    text: message
  };
}

function socialSuccess(message) {
  return {
    type: ACTIONS.RENDER_SNACKBAR,
    styling: "success",
    text: message
  };
}

export function renderSocialError(message) {
  return function(dispatch) {
    dispatch(socialError(message));
  };
}

export function renderSocialSuccess(message) {
  return function(dispatch) {
    dispatch(socialSuccess(message));
  };
}
