// load the things we need
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// define the schema for our user model
var appletSchema = mongoose.Schema({
	action: {
		id: String,
		heading: String,
		content: String,
		trelloOptions: {
			listName: String,
			boardID: String,
			position: String
		},
		slackOptions: {
			to: String,
			message: String
		}
	},
	trigger: {
		id: String,
		heading: String,
		content: String
	},
	option: {
		watchFrom: String,
		watchTo: String,
		watchFor: String
	},
	content: String,
	heading: String,
	isActive: {type: Boolean, default: true},
	user: { type: Schema.Types.ObjectId, ref: 'User' }
});

// create the model for users and expose it to our app
module.exports = mongoose.model("Applet", appletSchema);
