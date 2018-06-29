//list of all buttons through which we send request to particular api to connect to it
//export the buttons from here and render them as required
//For hints on how to render see the ServiceCards.js file in current directory

import React from "react";
import Button from "@material-ui/core/Button";

//this ia slack button
const SlackButton = (
	<a href="http://localhost:3001/api/slack/auth/">
		<Button
			variant="raised"
			className="slack-btn"
			style={{ backgroundColor: "#db3236", color: "white" }}
		>
			connect Slack{" "}
		</Button>
	</a>
);
const MailButton = (
	<a href="http://localhost:3001/api/gmail/auth/">
		<Button
			variant="raised"
			className="mail-btn"
			style={{ backgroundColor: "#db3236", color: "white" }}
		>
			connect Gmail
		</Button>
	</a>
);
const TrelloButton = (
	<a href="http://localhost:3001/api/gmail/auth/">
		<Button
			variant="raised"
			className="mail-btn"
			style={{ backgroundColor: "#db3236", color: "white" }}
		>
			connect Trello
		</Button>
	</a>
);
const FacebookButton = (
	<a href="http://localhost:3001/api/gmail/auth/">
		<Button
			variant="raised"
			className="mail-btn"
			style={{ backgroundColor: "#db3236", color: "white" }}
		>
			connect Facebook
		</Button>
	</a>
);
const GithubButton = (
	<a href="http://localhost:3001/api/gmail/auth/">
		<Button
			variant="raised"
			className="mail-btn"
			style={{ backgroundColor: "#db3236", color: "white" }}
		>
			connect Github
		</Button>
	</a>
);
const TwitterButton = (
	<a href="http://localhost:3001/api/gmail/auth/">
		<Button
			variant="raised"
			className="mail-btn"
			style={{ backgroundColor: "#db3236", color: "white" }}
		>
			connect Twitter
		</Button>
	</a>
);
const InstagramButton = (
	<a href="http://localhost:3001/api/gmail/auth/">
		<Button
			variant="raised"
			className="mail-btn"
			style={{ backgroundColor: "#db3236", color: "white" }}
		>
			connect Instagram
		</Button>
	</a>
);
export {SlackButton,MailButton,FacebookButton,InstagramButton,GithubButton,TwitterButton,TrelloButton}