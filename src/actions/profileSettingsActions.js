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

function change_email_success_snackbar(email) {
  return {
    type: ACTIONS.RENDER_SNACKBAR,
    styling: "success",
    text: "You've successfully changed email!",
    email : email
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
      .post("http://localhost:3001/api/users/change_email", {
        email: values.email
      }, {withCredentials: true})
      .then((json) => {
        let email = json.data.email
        dispatch(change_email_success(json.data.email));
        dispatch(change_email_success_snackbar());
      })
      .catch(error => {
        if (error.response) {
          error = error.response.data.status
        } 
        else {
          error='Something wrong with server'
        }
        dispatch(change_email_failure(error));
        dispatch(change_email_failure_snackbar(error));
      });
  };
}
