import * as ACTIONS from "./actionTypes";
const axios = require("axios");

function login_on() {
  return {
    type: ACTIONS.LOGIN
  };
}

function login_success(user) {
  return {
    type: ACTIONS.LOGIN_SUCCESS,
    userEmail: user.name
  };
}

function login_success_snackbar() {
  return {
    type: ACTIONS.RENDER_SNACKBAR,
    styling: "success",
    text: "You've successfully logged in"
  };
}

function login_failure(error) {
  return {
    type: ACTIONS.LOGIN_FAILURE,
    error: error
  };
}

function login_failure_snackbar(error) {
  return {
    type: ACTIONS.RENDER_SNACKBAR,
    styling: "error",
    text: error
  };
}

export function logout() {
  return {
    type: ACTIONS.LOGOUT
  };
}

export function setUserEmail(userEmail) {
  return {
    type: ACTIONS.SET_USER_FROM_LOCALSTORAGE,
    userEmail: userEmail
  };
}

export function login(values) {
  console.log(values);
  return function(dispatch) {
    // First dispatch: the app state is updated to inform
    dispatch(login_on());
    axios
      .post("http://localhost:3001/api/users/login", {
        username: values.username,
        password: values.password,
        email: values.email
      })
      .then(response => {
        dispatch(login_success(response.data.user));
        dispatch(login_success_snackbar());
      })
      .catch(error => {
        error = error.response.data.status;
        dispatch(login_failure(error));
        dispatch(login_failure_snackbar(error));
      });
  };
}
