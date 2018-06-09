import fetch from 'cross-fetch';
import * as ACTIONS from "./actionTypes";

function change_email_on() {
    return {
        type: ACTIONS.CHANGING_EMAIL
    }
}


function change_email_success(json) {
    return {
        type: ACTIONS.CHANGING_EMAIL_SUCCESS,
        userEmail: json.userEmail,
    }
}



function change_email_failure(error) {
    return {
        type: ACTIONS.CHANGING_EMAIL_FAILURE,
        error: error
    }
}

function change_email_success_snackbar() {
    return {
        type: ACTIONS.RENDER_SNACKBAR,
        styling: 'success',
        text: "You've successfully changed email!"
    }
}

function change_email_failure_snackbar(error) {
    return {
        type: ACTIONS.RENDER_SNACKBAR,
        styling: 'error',
        text: error
    }
}

export function linkOrUnlinkFB() {
    return {
        type: ACTIONS.LINK_FB,
    }
}

export function linkOrUnlinkGoogle() {
    return {
        type: ACTIONS.LINK_GOOGLE,
    }
}



export function change_email(values) {

    return function (dispatch) {

        // First dispatch: the app state is updated to inform
        dispatch(change_email_on());

        fetch('https://reqres.in/api/users', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: values.email
            })
        })
            .then(
                json => {
                    dispatch(change_email_success(json))
                    dispatch(change_email_success_snackbar())
                },
                error => {
                    console.log(error);
                    dispatch(change_email_failure(error))
                    dispatch(change_email_failure_snackbar(error))
                }
            )
    }
}