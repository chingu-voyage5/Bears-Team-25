import * as ACTIONS from "./actionTypes";
import { logout } from "./loginActions";
const axios = require("axios");

function account_deletion_on() {
  return {
    type: ACTIONS.ACCOUNT_DELETION
  };
}

function account_deletion_success() {
  return {
    type: ACTIONS.ACCOUNT_DELETION_SUCCESS
  };
}

function account_deletion_failure(error) {
  return {
    type: ACTIONS.ACCOUNT_DELETION_FAILURE,
    error: error
  };
}

function account_deletion_success_snackbar() {
  return {
    type: ACTIONS.RENDER_SNACKBAR,
    styling: "info",
    text: "You've deleted your account."
  };
}

function account_deletion_failure_snackbar(error) {
  return {
    type: ACTIONS.RENDER_SNACKBAR,
    styling: "error",
    text: error
  };
}

export function delete_account(values) {
  console.log(values);
  return function(dispatch) {
    // First dispatch: the app state is updated to inform
    dispatch(account_deletion_on());
    axios
      .post(
        "http://localhost:3001/api/users/delete_account",
        {
          password: values.password
        },
        { withCredentials: true }
      )
      .then(() => {
        dispatch(logout(true));
        dispatch(account_deletion_success());
        dispatch(account_deletion_success_snackbar());
      })
      .catch(error => {
        if (error.response) {
          error = error.response.data.status;
        } else {
          error = "Something wrong with server";
        }
        dispatch(account_deletion_failure(error));
        dispatch(account_deletion_failure_snackbar(error));
      });
  };
}
