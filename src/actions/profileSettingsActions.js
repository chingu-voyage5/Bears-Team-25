import * as ACTIONS from "./actionTypes";
const axios = require("axios");

function change_email_on() {
  return {
    type: ACTIONS.CHANGING_EMAIL
  };
}

function change_email_success(json) {
  return {
    type: ACTIONS.CHANGING_EMAIL_SUCCESS
  };
}

function change_email_failure(error) {
  return {
    type: ACTIONS.CHANGING_EMAIL_FAILURE,
    error: error
  };
}

function change_email_success_snackbar() {
  return {
    type: ACTIONS.RENDER_SNACKBAR,
    styling: "success",
    text: "You've successfully changed email!"
  };
}

function change_email_failure_snackbar(error) {
  return {
    type: ACTIONS.RENDER_SNACKBAR,
    styling: "error",
    text: error
  };
}

export function linkOrUnlinkFB() {
  return {
    type: ACTIONS.LINK_FB
  };
}

export function linkOrUnlinkGoogle() {
  return {
    type: ACTIONS.LINK_GOOGLE
  };
}

export function change_email(values) {
  console.log(values);
  return function(dispatch) {
    // First dispatch: the app state is updated to inform
    dispatch(change_email_on());
    axios
      .post("https://reqres.in/api/users", {
        email: values.email
      })
      .then(() => {
        dispatch(change_email_success());
        dispatch(change_email_success_snackbar());
      })
      .catch(error => {
        error = error.response.data.status;
        dispatch(change_email_failure(error));
        dispatch(change_email_failure_snackbar(error));
      });
  };
}
