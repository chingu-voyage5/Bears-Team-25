import * as ACTIONS from "./actionTypes";
import { setUsersCredentials } from "./loginActions";
const axios = require("axios");

function signUp_on() {
  return {
    type: ACTIONS.SIGN_UP
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
      .post(
        "http://localhost:3001/api/users/signup",
        {
          username: values.username,
          password: values.password,
          email: values.email
        },
        { withCredentials: true }
      )
      .then(response => {
        let user = response.data.user;
        if (user) {
          localStorage.setItem("name", user.name);
          if (user.email === undefined) {
            user.email = "";
          }
          dispatch(setUsersCredentials(user));
        }
        dispatch(signUp_success_snackbar());
      })
      .catch(error => {
        console.log(error);
        if (error.response) {
          error = error.response.data.status;
        } else {
          error = "Something wrong with server";
        }
        dispatch(signUp_failure(error));
        dispatch(signUp_failure_snackbar(error));
      });
  };
}
