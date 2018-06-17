//reducer for all applets
import * as ACTIONS from "../actions/actionTypes";

const appletReducer = (state = {}, action) => {
	// console.log(action.type);
	switch (action.type) {
		case ACTIONS.LIST_APPLET:
			return {
				...state,
				appletList: state.appletList.concat(action.payload)
			};
		case ACTIONS.SHOW_MY_APPLET:
			return {
				...state,
				myApplet: state.myApplet.concat(action.payload)
			};
		default:
			return state;
	}
};

export default appletReducer;
