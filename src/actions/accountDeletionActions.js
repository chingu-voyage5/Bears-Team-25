import fetch from 'cross-fetch';
import * as ACTIONS from "./actionTypes";
import {logout} from './loginActions'

function account_deletion_on() {
    return {
        type: ACTIONS.ACCOUNT_DELETION
    }
}

function account_deletion_success(json) {
    return {
        type: ACTIONS.ACCOUNT_DELETION_SUCCESS,
        userEmail: json.userEmail,
    }
}

function account_deletion_failure(error) {
    return {
        type: ACTIONS.ACCOUNT_DELETION_FAILURE,
        error: error
    }
}

function account_deletion_success_snackbar() {
    return {
        type: ACTIONS.RENDER_SNACKBAR,
        styling: 'info',
        text: "You've deleted your account."
    }
}

function account_deletion_failure_snackbar(error) {
    return {
        type: ACTIONS.RENDER_SNACKBAR,
        styling: 'error',
        text: error
    }
}

export function delete_account(values) {

    return function (dispatch) {

        // First dispatch: the app state is updated to inform
        dispatch(account_deletion_on());

        fetch("https://reqres.in/api/users", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: values.password
            })
        })
            .then(
                json => {
                    json.userEmail = 'fetchedUserEmail@gmail.com'
                    localStorage.setItem('userEmail', json.userEmail)
                    // updating upp state with result 
                    dispatch(logout())
                    dispatch(account_deletion_success(json))
                    dispatch(account_deletion_success_snackbar())
                },
                error => {
                    console.log(error);
                    dispatch(account_deletion_failure(error))
                    dispatch(account_deletion_failure_snackbar(error))
                }
            )
    }
}

