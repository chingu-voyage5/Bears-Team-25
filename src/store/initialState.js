const initialState = {
	service: [
		{
			name: "Mail",
			color: "maroon"
		},
		{
			name: "Twitter",
			color: "blue"
		},
		{
			name: "Facebook",
			color: "Green"
		},
		{
			name: "Youtube",
			color: "maroon"
		},
		{
			name: "Instagram",
			color: "blue"
		},
		{
			name: "Google+",
			color: "green"
		},
		{
			name: "Trello",
			color: "blue"
		},
		{
			name: "Date and Time",
			color: "Brown"
		}
	],
	trigger: {
		Trello: [
			{
				heading: "Card added to board",
				content:
					"This trigger fires every time a card is added to a board"
			},
			{
				heading: "Card added to board",
				content:
					"This trigger fires every time a card is added to a board"
			},
			{
				heading: "Card added to board",
				content:
					"This trigger fires every time a card is added to a board"
			},
			{
				heading: "Card added to board",
				content:
					"This trigger fires every time a card is added to a board"
			},
			{
				heading: "Card added to board",
				content:
					"This trigger fires every time a card is added to a board"
			},
			{
				heading: "Card added to board",
				content:
					"This trigger fires every time a card is added to a board"
			}
		]
	},
	action: {
		Mail: [
			{
				heading: "Send me an email",
				content:
					"This Action will send you an HTML based email. Images and links are supported."
			}
		]
	},
	create: {
		appletList: [
			{
				actionHeading: "Send me an email",
				actionContent:
					"This Action will send you an HTML based email. Images and links are supported.",
				content: "Random content",
				heading: "Random content",
				triggerHeading: "Add a Card to trello",
				triggerContent:
					"A card has been added to trello board of yours",
				serviceFrom: "Trello",
				serviceTo: "Mail",
				condition: "On"
			},
			{
				actionHeading: "Send me an email",
				actionContent:
					"This Action will send you an HTML based email. Images and links are supported.",
				content: "Random content",
				heading: "Random content",
				triggerHeading: "Add a Card to trello",
				triggerContent:
					"A card has been added to trello board of yours",
				serviceFrom: "Trello",
				serviceTo: "Mail",
				condition: "On"
			},
			{
				actionHeading: "Send me an email",
				actionContent:
					"This Action will send you an HTML based email. Images and links are supported.",
				content: "Random content",
				heading: "Random content",
				triggerHeading: "Add a Card to trello",
				triggerContent:
					"A card has been added to trello board of yours",
				serviceFrom: "Trello",
				serviceTo: "Mail",
				condition: "On"
			},
			{
				actionHeading: "Send me an email",
				actionContent:
					"This Action will send you an HTML based email. Images and links are supported.",
				content: "Random content",
				heading: "Random content",
				triggerHeading: "Add a Card to trello",
				triggerContent:
					"A card has been added to trello board of yours",
				serviceFrom: "Trello",
				serviceTo: "Mail",
				condition: "On"
			}
		],
		allAppletList: [
			{
				actionHeading: "Send me an email",
				actionContent:
					"This Action will send you an HTML based email. Images and links are supported.",
				content: "Random content",
				heading: "Random content",
				triggerHeading: "Add a Card to trello",
				triggerContent:
					"A card has been added to trello board of yours",
				serviceFrom: "Trello",
				serviceTo: "Mail",
				condition: "On"
			},
			{
				actionHeading: "Send me an email",
				actionContent:
					"This Action will send you an HTML based email. Images and links are supported.",
				content: "Random content",
				heading: "Random content",
				triggerHeading: "Add a Card to trello",
				triggerContent:
					"A card has been added to trello board of yours",
				serviceFrom: "Trello",
				serviceTo: "Mail",
				condition: "On"
			},
			{
				actionHeading: "Send me an email",
				actionContent:
					"This Action will send you an HTML based email. Images and links are supported.",
				content: "Random content",
				heading: "Random content",
				triggerHeading: "Add a Card to trello",
				triggerContent:
					"A card has been added to trello board of yours",
				serviceFrom: "Trello",
				serviceTo: "Mail",
				condition: "On"
			},
			{
				actionHeading: "Send me an email",
				actionContent:
					"This Action will send you an HTML based email. Images and links are supported.",
				content: "Random content",
				heading: "Random content",
				triggerHeading: "Add a Card to trello",
				triggerContent:
					"A card has been added to trello board of yours",
				serviceFrom: "Trello",
				serviceTo: "Mail",
				condition: "On"
			}
		]
	}
};

export default initialState;
