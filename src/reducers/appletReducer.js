//reducer for all applets
import * as ACTIONS from "../actions/actionTypes";

const appletReducer = (state = {}, action) => {
	switch (action.type) {
		case ACTIONS.LIST_APPLET:
			//for listing out all applets
			return {
				...state,
				appletList: action.payload
			};
		case ACTIONS.SHOW_MY_APPLET:
			//listing out only user's applet
			return {
				...state,
				myApplet: action.payload
			};
		default:
			return state;
	}
};

export default appletReducer;
