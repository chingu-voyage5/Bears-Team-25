//contains action-creators for create-applet

import * as ACTIONS from "./actionTypes";

export function addApplet(appletData) {
	return {
		type: ACTIONS.CREATE_APPLET,
		payload: appletData
	};
}
