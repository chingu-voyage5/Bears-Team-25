const initialState = {
	serviceList: {
		list: [
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
				name:"Trello",
				color:"blue"
			},
			{
				name: "Date and Time",
				color: "Brown"
			},		
		]
	},
	serviceTrigger: {
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
	serviceAction: {
		Mail: [
			{
				heading: "Send me an email",
				content:
					"This Action will send you an HTML based email. Images and links are supported."
			}
		]
	}
};

export default initialState;
