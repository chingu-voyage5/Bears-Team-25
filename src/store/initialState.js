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
		Mail: [
			{
				heading: "Get a mail",
				content: "When you get a mail from some specified address"
			}
		]
	},
	action: {
		Mail: {
			Mail: [
				{
					heading: "Get a mail",
					content: "When you get a mail from some specified address"
				}
			]
		},
		Twitter: [],
		Facebook: [],
		Github: [],
		Slack: {
			Mail: [
				{
					heading: "Get a mail",
					content: "When you get a mail from some specified address"
				}
			]
		}
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
