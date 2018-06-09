import fetch from 'cross-fetch';
import * as ACTIONS from "./actionTypes";

function change_password_on() {
    return {
        type: ACTIONS.CHANGING_PASS
    }
}

function change_password_success(json) {
    return {
        type: ACTIONS.CHANGING_PASS_SUCCESS,
        userEmail: json.userEmail,
    }
}

function change_password_failure(error) {
    return {
        type: ACTIONS.CHANGING_PASS_FAILURE,
        error: error
    }
}

function change_password_success_snackbar() {
    return {
        type: ACTIONS.RENDER_SNACKBAR,
        styling: 'success',
        text: "You've successfully changed password!"
    }
}

function change_password_failure_snackbar(error) {
    return {
        type: ACTIONS.RENDER_SNACKBAR,
        styling: 'error',
        text: error
    }
}

export function successOff() {
    return {
        type: ACTIONS.SUCCESS_OFF
    }
}

export function change_password(values) {

    return function (dispatch) {

        // First dispatch: the app state is updated to inform
        dispatch(change_password_on());


        
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
                    // updating upp state with result 
                    dispatch(change_password_success(json))
                    dispatch(change_password_success_snackbar())
                },
                error => {
                    console.log(error);
                    dispatch(change_password_failure(error))
                    dispatch(change_password_failure_snackbar(error))
                }
            )
    }
}