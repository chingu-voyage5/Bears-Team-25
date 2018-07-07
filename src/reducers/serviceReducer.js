//reducer for all services

import * as ACTIONS from "../actions/actionTypes";
const serviceReducer = (state = {}, action) => {
	switch (action.type) {
		case ACTIONS.SHOW_SERVICES:
			return {
				...state,
				serviceList: action.payload
			};
		default:
			return state;
	}
};

export default serviceReducer;