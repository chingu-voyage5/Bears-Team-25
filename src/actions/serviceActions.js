//actions for discover page

import * as ACTIONS from "./actionTypes";
import axios from "./axiosInstances"; // Pre configured axios instance

//list out all the applets by all users,i.e, global applets
export function listServices() {
	   return dispatch => {
		axios
			.get("/services",{ withCredentials: true })
			.then(services => {
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

function disconnect_service(servicesSubscribed, servicesNotSubscribed) {
	return {
	  type: ACTIONS.DISCONNECT_SERVICE,
	  servicesSubscribed,
	  servicesNotSubscribed
	};
  }

function disconnect_service_success(service) {
	return {
	  type: ACTIONS.RENDER_SNACKBAR,
	  styling: "success",
	  text: `You've successfully disconnected ${service}.`
	};
  }

function disconnect_service_failure(error) {
	return {
	  type: ACTIONS.RENDER_SNACKBAR,
	  styling: "error",
	  error: error
	};
  }  

export function disconnectService(service) {
	return function(dispatch) {
		service = service.toLowerCase();
		if (service === 'mail') service = 'gmail';
	  axios
		.get(`${service}/disconnect`,{withCredentials: true})
		.then((json) => {
			 const {servicesSubscribed, servicesNotSubscribed} = json.data;
			 dispatch(disconnect_service(servicesSubscribed, servicesNotSubscribed));
			 dispatch(disconnect_service_success(service));
		})
		.catch(error => {
		  console.log(error)
		  if (error.response) {
			error = error.response.data.status
		  } 
		  else {
			error='Something wrong with server'
		  }
		  dispatch(disconnect_service_failure(error));
		});
	};
  }

