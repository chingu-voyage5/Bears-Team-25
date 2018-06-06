import * as ACTIONS from "../actions/actionTypes";

const createReducer = (state = {}, action) => {
	switch (action.type) {
		case ACTIONS.CREATE_APPLET:
			return {
				...state,
				appletList: action.payload
			};
		default:
			return state;
	}
};

export default createReducer;
