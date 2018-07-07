//all actions for activity are listed here

import * as ACTIONS from "./actionTypes";
import axios from "./axiosInstances"; // Pre configured axios instance

//returns all the acitvity for an user
export function myActivityActions() {
	   return dispatch => {
		axios
			.get("/myactivity",{ withCredentials: true })
			.then(allActivity => {
				console.log("Done in myActivityActions");
				console.log(allActivity);
				dispatch({
					type: ACTIONS.SHOW_MY_ACTIVITY,
					payload: allActivity.data
				});
			})
			.catch(err => {
				console.log(err+"Here");
				dispatch({
					type: ACTIONS.SHOW_MY_ACTIVITY + "_REJECTED",
					payload: err.response // We are using "err.reponse" to get error response text from server. If we just used "err" onely then we get axios manipulated error.
				});
			});
	};
}
