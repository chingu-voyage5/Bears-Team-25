import * as ACTIONS from "./actionTypes";
import axios from "./axiosInstances"; // Pre configured axios instance

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
    email: email
  };
}

function change_email_failure_snackbar(error) {
  return {
    type: ACTIONS.RENDER_SNACKBAR,
    styling: "error",
    text: error
  };
}

export function unlinkFB() {
  return {
    type: ACTIONS.UNLINK_FB
  };
}

function unlinkGoogle() {
  return {
    type: ACTIONS.UNLINK_GOOGLE
  };
}

function unlinkGoogle_success() {
  return {
    type: ACTIONS.RENDER_SNACKBAR,
    styling: "success",
    text: "You've successfully unlinked Google account."
  };
}

function unlinkFB_success() {
  return {
    type: ACTIONS.RENDER_SNACKBAR,
    styling: "success",
    text: "You've successfully unlinked Facebook account."
  };
}

function unlinkFB_failure(error) {
  return {
    type: ACTIONS.RENDER_SNACKBAR,
    styling: "error",
    error: error
  };
}

function unlinkGoogle_failure(error) {
  return {
    type: ACTIONS.RENDER_SNACKBAR,
    styling: "error",
    error: error
  };
}

export function unlink(social) {
  return function(dispatch) {
    axios
      .post(
        "/users/unlink",
        {
          social: social
        },
        { withCredentials: true }
      )
      .then(json => {
        console.log(json.data);
        social === "facebook"
          ? dispatch(unlinkFB()) && dispatch(unlinkFB_success())
          : dispatch(unlinkGoogle()) && dispatch(unlinkGoogle_success());
      })
      .catch(error => {
        console.log(error);
        if (error.response) {
          error = error.response.data.status;
        } else {
          error = "Something wrong with server";
        }
        social === "facebook"
          ? dispatch(unlinkFB_failure(error))
          : dispatch(unlinkGoogle_failure(error));
      });
  };
}

export function change_email(values) {
  return function(dispatch) {
    // First dispatch: the app state is updated to inform
    dispatch(change_email_on());
    axios
      .post(
        "/users/change_email",
        {
          email: values.email
        },
        { withCredentials: true }
      )
      .then(json => {
        let email = json.data.email;
        dispatch(change_email_success(email));
        dispatch(change_email_success_snackbar());
      })
      .catch(error => {
        if (error.response) {
          error = error.response.data.status;
        } else {
          error = "Something wrong with server";
        }
        dispatch(change_email_failure(error));
        dispatch(change_email_failure_snackbar(error));
      });
  };
}
