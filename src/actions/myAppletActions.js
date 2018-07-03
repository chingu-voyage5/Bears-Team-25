//actions for myapplet page are here

import * as ACTIONS from "./actionTypes";
import axios from "./axiosInstances"; // Pre configured axios instance

//lists out all the user's applet
export function myAppletActions() {
	   return dispatch => {
		axios
			.get("/myapplets",{ withCredentials: true })
			.then(allApplets => {
				// console.log("Done in myAppletActions");
				dispatch({
					type: ACTIONS.SHOW_MY_APPLET,
					payload: allApplets.data
				});
			})
			.catch(err => {
				console.log(err+"Here");
				dispatch({
					type: ACTIONS.SHOW_MY_APPLET + "_REJECTED",
					payload: err.response // We are using "err.reponse" to get error response text from server. If we just used "err" onely then we get axios manipulated error.
				});
			});
	};
}
