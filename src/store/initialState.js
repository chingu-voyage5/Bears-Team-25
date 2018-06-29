const initialState = {
	service: {
		allServiceList: [
			"Mail",
			"Trello",
			"Github",
			"Facebook",
			"Twitter",
			"Instagram",
			"Slack"
		],
		serviceList: []
	},
	trigger: {
		Trello: [],
		Facebook: [],
		Twitter: [],
		Instagram: [],
		Github: [],
		Slack: [],
		Mail: []
	},
	action: {
		Mail: [],
		Twitter: [],
		Facebook: [],
		Github: []
	},
	create: {
		appletList: []
	},
	activity: {
		activityList: []
	},
	applet: {
		appletList: [],
		myApplet: []
	}
};

export default initialState;
