"use strict";
const nodemailer = require("nodemailer");
const express = require("express");
const passport = require("passport");
const mailRouter = express.Router();
require("dotenv").config();
const app = express();

//getting the authentication with the following scope
mailRouter.get("/auth", passport.authenticate("gmail", {
	scope: ["profile", "email", "https://www.googleapis.com/auth/gmail.send"],//scope that send mail
	accessType: "offline",
	approvalPrompt: "force"
}));

mailRouter.get(
	"/auth/callback",
	passport.authenticate("gmail", {
	  failureRedirect: "http://localhost:3000/login"
	}),
	(req, res) => res.redirect("http://localhost:3000/") // Successful authentication, redirect home.
  );



// //creates a simple account to send mail
// nodemailer.createTestAccount((err, account) => {
// 	// create reusable transporter object using the default SMTP transport
// 	let transporter = nodemailer.createTransport({
// 		service: "Gmail",
// 		auth: {
// 			// user: process.env.STRUSERNAME, // generated ethereal user
// 			// pass: process.env.PASSWORD // generated ethereal password
// 			type: "OAuth2",
// 			user: process.env.STRUSERNAME,//replace with username of the user
// 			scope: "https://www.googleapis.com/auth/gmail.send",
// 			clientId: process.env.clientID,
// 			clientSecret: process.env.clientSecret,
// 			refreshToken: activeToken.refresh_token
// 		}
// 	});

// 	// setup email data with unicode symbols
// 	let mailOptions = {
// 		from: "bearsteam25voyage5@gmail.com", // sender address
// 		to: "anshuldubey2166@gmail.com", // list of receivers
// 		subject: "Hello", // Subject line
// 		text: "Hello world?", // plain text body
// 		html: "<b>Hello world?</b>" // html body
// 	};

// 	// send mail with defined transport object
// 	transporter.sendMail(mailOptions, (error, info) => {
// 		if (error) {
// 			return console.log(error);
// 		}
// 		console.log("Message sent: %s", info.messageId);
// 		// Preview only available when sending through an Ethereal account
// 		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

// 		// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
// 		// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// 	});
// });


module.exports = mailRouter;