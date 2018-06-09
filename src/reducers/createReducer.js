//reducer for all applet creation

import * as ACTIONS from "../actions/actionTypes";

const createReducer = (state = {}, action) => {
	switch (action.type) {
		case ACTIONS.CREATE_APPLET:
			return {
				...state,
				appletList: state.appletList.concat(action.payload)
			};
		default:
			return state;
	}
};

export default createReducer;
