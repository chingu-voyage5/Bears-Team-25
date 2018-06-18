//reducer for all applets
import * as ACTIONS from "../actions/actionTypes";

const appletReducer = (state = {}, action) => {
	console.log("Here in redcuer with "+action.type);
	console.log(action.payload);
	switch (action.type) {
		case ACTIONS.LIST_APPLET:
			return {
				...state,
				appletList: action.payload
			};
		case ACTIONS.SHOW_MY_APPLET:
			return {
				...state,
				myApplet: action.payload
			};
		default:
			return state;
	}
};

export default appletReducer;
