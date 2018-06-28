import React from "react";
import Button from "@material-ui/core/Button";

const SlackButton = (
	<a href="http://localhost:3001/api/slack/auth/">
		<Button
			variant="raised"
			className="slack-btn"
			style={{ backgroundColor: "#49c4a1", color: "white" }}
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