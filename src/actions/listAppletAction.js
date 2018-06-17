import * as ACTIONS from "./actionTypes";
import axios from "./axiosInstances"; // Pre configured axios instance

export function listApplets() {
	// return {
	// 	type: ACTIONS.LIST_APPLET,
	// 	payload: axios.get("applets")
	// };
	   return dispatch => {
		axios
			.get("/applets",{ withCredentials: true })
			.then(allApplets => {
				console.log("Done");
				dispatch({
					type: ACTIONS.LIST_APPLET,
					payload: allApplets.data
				});
			})
			.catch(err => {
				console.log(err+"Here");
				dispatch({
					type: ACTIONS.LIST_APPLET + "_REJECTED",
					payload: err.response // We are using "err.reponse" to get error response text from server. If we just used "err" onely then we get axios manipulated error.
				});
			});
	};
}
