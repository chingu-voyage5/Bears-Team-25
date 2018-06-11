import fetch from 'cross-fetch';
import * as ACTIONS from "./actionTypes";



function login_on() {
    return {
        type: ACTIONS.LOGIN
    }
}

function login_success(json) {
    return {
        type: ACTIONS.LOGIN_SUCCESS,
        userEmail: json.userEmail,
    }
}

function login_success_snackbar() {
    return {
        type: ACTIONS.RENDER_SNACKBAR,
        styling: 'success',
        text: "You've successfully logged in"
    }
}

function login_failure(error) {
    return {
        type: ACTIONS.LOGIN_FAILURE,
        error: error
    }
}

function login_failure_snackbar(error) {
    return {
        type: ACTIONS.RENDER_SNACKBAR,
        styling: 'error',
        text: error
    }
}

export function logout() {
    return {
        type: ACTIONS.LOGOUT,
    }
}

export function setUserEmail(userEmail) {
    return {
        type: ACTIONS.SET_USER_FROM_LOCALSTORAGE, userEmail: userEmail
    }
}

export function login(values = {}) {

    return function (dispatch) {
        // First dispatch: the app state is updated to inform
        dispatch(login_on());

        fetch('http://localhost:3001/api/users/login', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: values.email,
                password: values.password
            })
        })
            .then(
                json => {
                    json.userEmail = 'fetchedUserEmail@gmail.com'
                    localStorage.setItem('userEmail', json.userEmail)
                    // updating upp state with result 
                    dispatch(login_success(json))
                    dispatch(login_success_snackbar())
                },
                error => {

                    dispatch(login_success({jsuserEmail :'fetchedUserEmail@gmail.com'}))
                    dispatch(login_success_snackbar())
                }
            )
    }
}