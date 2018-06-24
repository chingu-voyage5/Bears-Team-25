//actions for discover page

import * as ACTIONS from "./actionTypes";
import axios from "./axiosInstances"; // Pre configured axios instance

//list out all the applets by all users,i.e, global applets
export function listServices() {
	   return dispatch => {
		axios
			.get("/services",{ withCredentials: true })
			.then(services => {
				console.log("Done");
				dispatch({
					type: ACTIONS.SHOW_SERVICES,
					payload: services.data
				});
			})
			.catch(err => {
				console.log(err+"Here");
				dispatch({
					type: ACTIONS.SHOW_SERVICES + "_REJECTED",
					payload: err.response // We are using "err.reponse" to get error response text from server. If we just used "err" onely then we get axios manipulated error.
				});
			});
	};
}
