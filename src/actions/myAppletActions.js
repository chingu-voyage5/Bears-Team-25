//actions for myapplet page are here

import * as ACTIONS from "./actionTypes";
import axios from "./axiosInstances"; // Pre configured axios instance

//lists out all the user's applet
export function myAppletActions() {
	   return dispatch => {
		axios
			.get("/myapplets",{ withCredentials: true })
			.then(allApplets => {
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


function deletingApplet_success_snackbar() {
  return {
    type: ACTIONS.RENDER_SNACKBAR,
    styling: "success",
    text: "You've successfully deleted applet!"
  };
}

function deletingApplet_failure_snackbar(error) {
  return {
    type: ACTIONS.RENDER_SNACKBAR,
    styling: "error",
    text: error
  };
}

export function deletingApplet(id) {
  return function(dispatch) {
    axios
	  .delete(`/myapplets/${id}`,
	  {withCredentials: true})
      .then(response => {
        dispatch({
					type: ACTIONS.SHOW_MY_APPLET,
					payload: response.data
				});
        dispatch(deletingApplet_success_snackbar());
      })
      .catch(error => {
        console.log(error)
        if (error.response) {
          error = error.response.data.status
        } 
        else {
          error='Something wrong with server'
        }
        dispatch(deletingApplet_failure_snackbar(error));
      });
  };
}

