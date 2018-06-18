// load the things we need
var mongoose = require("mongoose");

// define the schema for our user model
var appletSchema = mongoose.Schema({
	action: {
		id: String,
		heading: String,
		content: String
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
	heading: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model("Applet", appletSchema);
