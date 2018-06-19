import * as ACTIONS from "./actionTypes";
const axios = require("axios");

function login_on() {
  return {
    type: ACTIONS.LOGIN
  };
}

export function setUsersCredentials(user) {
  if (user){
    return {
      type: ACTIONS.SET_USERS_CREDENTIALS,
      name: user.name,
      email: user.email,
      isFBLinked: user.isFBLinked,
      isGoogleLinked: user.isGoogleLinked,
      isSlackToken: user.isSlackToken,
      auth: true
    };
  }
  else {
    return {
      type: ACTIONS.SET_USERS_CREDENTIALS,
      name: null,
      email: null,
      isFBLinked: false,
      isGoogleLinked: false,
      auth: false
    };
  }
 
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

function logout_local() {
  return {
    type: ACTIONS.LOGOUT
  };
}

function logout_success() {
  return {
    type: ACTIONS.LOGOUT_SUCCESS
  };
}

function logout_failure() {
  return {
    type: ACTIONS.LOGOUT_FAILURE
  };
}

function logout_success_snackbar() {
  return {
    type: ACTIONS.RENDER_SNACKBAR,
    styling: "success",
    text: "You've successfully logged out"
  };
}

export function logout(withoutSnackbar = false) {
  return function(dispatch) {
    // First dispatch: the app state is updated to inform
    dispatch(logout_local());
    axios
      .get("http://localhost:3001/api/users/logout",{withCredentials: true})
      .then(() => {
        dispatch(logout_success())
        if (!withoutSnackbar) {
          dispatch(logout_success_snackbar());
        }
      })
      .catch(error => {
        if (error.response) {
          error = error.response.data.status;
        } else {
          error = "Something wrong with server";
        }
        dispatch(logout_failure());
      });
  };
}



export function login(values) {
  return function(dispatch) {
    // First dispatch: the app state is updated to inform
    dispatch(login_on());
    axios
      .post(
        "http://localhost:3001/api/users/login",
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
          localStorage.setItem('name', user.name)
          if (user.email === undefined) {
            user.email = "";
          }   
        }
        dispatch(setUsersCredentials(user));
        dispatch(login_success_snackbar());
      })
      .catch(error => {
        if (error.response) {
          error = error.response.data.status;
        } else {
          error = "Something wrong with server";
        }
        dispatch(login_failure(error));
        dispatch(login_failure_snackbar(error));
      });
  };
}

export function fetchUsersCredentials() {
  return function(dispatch) {
    axios
      .get(`http://localhost:3001/api/users/user?timestamp=${new Date().getTime()}`, {withCredentials: true})
      .then(response => {
        let user = response.data.user;
        console.log(user)
        if (user) {
          localStorage.setItem('name', user.name)
          if (user.email === undefined) {
            user.email = "";
          }
        dispatch(setUsersCredentials(user));
        }
      })
      .catch(error => {
        if (error.response) {
          error = error.response.data.status;
        } else {
          error = "Something wrong with server";
        }
        localStorage.removeItem('name')
        dispatch(setUsersCredentials(null));
      });
  };
}
