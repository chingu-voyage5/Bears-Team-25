//reducer for all services
import * as ACTIONS from "../actions/actionTypes";
const activityReducer = (state = {}, action) => {
	console.log("In activityReducer with " + action.type);
	switch (action.type) {
		case ACTIONS.SHOW_MY_ACTIVITY:
			return {
				...state,
				activityList: action.payload
			};
		default:
			return state;
	}
};

export default activityReducer;
