//reducer for all activity-related
import * as ACTIONS from "../actions/actionTypes";
const activityReducer = (state = {}, action) => {
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
