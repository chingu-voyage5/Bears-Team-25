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
		],
		Facebook: [
			{
				heading: "New photo post by you with hashtag",
				content:
					"This Trigger fires every time you post a new photo on Facebook with a specific hashtag."
			},
			{
				heading: "New status message by you with hashtag",
				content:
					"This Trigger fires every time you create a new plain text status message on Facebook with a specific hashtag."
			},
			{
				heading: "New link post by you with hashtag",
				content:
					"This Trigger fires every time you create a new link post on Facebook with a specific hashtag."
			}
		],
		Twitter: [
			{
				heading: "New tweet by you",
				content: "This trigger fires everytime you post a new tweet"
			},
			{
				heading: "New mention of you",
				content: "This trigger fires everytime when you are mentioned"
			},
			{
				heading: "New liked tweet by you",
				content: "This trigger fires everytime when you like a tweet"
			},
			{
				heading: "New tweet by you",
				content: "This trigger fires everytime you post a new tweet"
			}
		],
		Instagram: [
			{
				heading: "Add new photo by you",
				content:
					"This trigger fires when you share any new photo on Instagram"
			},
			{
				heading: "New photo by you using specific hashtag",
				content:
					"This trigger fires when you share any new photo on Instagram, with a hashtag you supplied"
			},
			{
				heading: "Any new video by you",
				content:
					"This trigger fires everytime when you post a video on Instagram"
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
