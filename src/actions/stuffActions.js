import * as ACTIONS from "./actionTypes";

export function addApplet(appletData) {
	console.log("Here");
	console.log(appletData);
	return {
		type: ACTIONS.CREATE_APPLET,
		payload: appletData
	};
}
