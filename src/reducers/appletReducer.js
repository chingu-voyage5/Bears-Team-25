//reducer for all applets
import * as ACTIONS from "../actions/actionTypes";

const appletReducer = (state = {}, action) => {
	// console.log(action.type);
	switch (action.type) {
		case ACTIONS.LIST_APPLET:
			return {
				...state,
				appletList: action.payload
			};
		default:
			return state;
	}
};

export default appletReducer;
