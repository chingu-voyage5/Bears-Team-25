import * as ACTIONS from "./actionTypes";
const axios = require("axios");

function signUp_on() {
  return {
    type: ACTIONS.SIGN_UP
  };
}

function signUp_success(user) {
  return {
    type: ACTIONS.SIGN_UP_SUCCESS,
    userEmail: user.name
  };
}

function signUp_failure(error) {
  return {
    type: ACTIONS.SIGN_UP_FAILURE,
    error: error
  };
}

function signUp_success_snackbar() {
  return {
    type: ACTIONS.RENDER_SNACKBAR,
    styling: "success",
    text: "You've successfully signed up!"
  };
}

function signUp_failure_snackbar(error) {
  return {
    type: ACTIONS.RENDER_SNACKBAR,
    styling: "error",
    text: error
  };
}

export function sign_up(values) {
  console.log(values);
  return function(dispatch) {
    // First dispatch: the app state is updated to inform
    dispatch(signUp_on());
    axios
      .post("http://localhost:3001/api/users/signup", {
        username: values.username,
        password: values.password,
        email: values.email
      })
      .then(response => {
        dispatch(signUp_success(response.data.user));
        dispatch(signUp_success_snackbar());
      })
      .catch(error => {
        error = error.response.data.status
        dispatch(signUp_failure(error));
        dispatch(signUp_failure_snackbar(error));
      });
  };
}
