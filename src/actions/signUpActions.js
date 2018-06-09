import fetch from 'cross-fetch';
import * as ACTIONS from "./actionTypes";

function signUp_on() {
    return {
        type: ACTIONS.SIGN_UP
    }
}

function signUp_success(json) {
    return {
        type: ACTIONS.SIGN_UP_SUCCESS,
        userEmail: json.userEmail,
    }
}

function signUp_failure(error) {
    return {
        type: ACTIONS.SIGN_UP_FAILURE,
        error: error
    }
}

function signUp_success_snackbar() {
    return {
        type: ACTIONS.RENDER_SNACKBAR,
        styling: 'success',
        text: "You've successfully signed up!"
    }
}

function signUp_failure_snackbar(error) {
    return {
        type: ACTIONS.RENDER_SNACKBAR,
        styling: 'error',
        text: error
    }
}

export function sign_up(values) {

    return function (dispatch) {
        // First dispatch: the app state is updated to inform
        dispatch(signUp_on());

        fetch("https://reqres.in/api/users", {
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
                    dispatch(signUp_success(json))
                    dispatch(signUp_success_snackbar())
                },
                error => {
                    console.log(error);
                    dispatch(signUp_failure(error))
                    dispatch(signUp_failure_snackbar(error))
                }
            )
    }
}
