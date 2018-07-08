//list of all buttons through which we send request to particular api to connect to it
//export the buttons from here and render them as required
//For hints on how to render see the ServiceCards.js file in current directory

import React from "react";
import Button from "@material-ui/core/Button";

//this ia slack button
const SlackButton = (isServiceConnected, disconnectService) => (
	<a href={isServiceConnected ? null : "http://localhost:3001/api/slack/auth/"}>
		<Button
			variant="raised"
			className="slack-btn"
			style={{ backgroundColor: "#db3236", color: "white" }}
			onClick = {isServiceConnected ? disconnectService : null}
		>
			{isServiceConnected ? 'disconnect Slack' : 'connect Slack'}
		</Button>
	</a>
);
const MailButton = (isServiceConnected, disconnectService) => (
	<a href={isServiceConnected ? null : "http://localhost:3001/api/gmail/auth/"}>
		<Button
			variant="raised"
			className="mail-btn"
			style={{ backgroundColor: "#db3236", color: "white" }}
			onClick = {isServiceConnected ? disconnectService : null}
		>
			{isServiceConnected ? 'disconnect Gmail' : 'connect Gmail'}
		</Button>
	</a>
);
const TrelloButton = (isServiceConnected, disconnectService) => (
	<a href={isServiceConnected ? null : "http://localhost:3001/api/trello/auth/"}>
		<Button
			variant="raised"
			className="mail-btn"
			style={{ backgroundColor: "#db3236", color: "white" }}
			onClick = {isServiceConnected ? disconnectService : null}
		>
			{isServiceConnected ? 'disconnect Trello' : 'connect Trello'}
		</Button>
	</a>
);
const FacebookButton = (isServiceConnected, disconnectService) => (
	<a href={isServiceConnected ? null : "http://localhost:3001/api/facebook/auth/"}>
		<Button
			variant="raised"
			className="mail-btn"
			style={{ backgroundColor: "#db3236", color: "white" }}
			onClick = {isServiceConnected ? disconnectService : null}
		>
			{isServiceConnected ? 'disconnect Facebook' : 'connect Facebook'}
		</Button>
	</a>
);
const GithubButton = (isServiceConnected, disconnectService) => (
	<a href={isServiceConnected ? null : "http://localhost:3001/api/github/auth/"}>
		<Button
			variant="raised"
			className="mail-btn"
			style={{ backgroundColor: "#db3236", color: "white" }}
			onClick = {isServiceConnected ? disconnectService : null}
		>
			{isServiceConnected ? 'disconnect Github' : 'connect Github'}
		</Button>
	</a>
);
const TwitterButton = (isServiceConnected, disconnectService) => (
	<a href={isServiceConnected ? null : "http://localhost:3001/api/twitter/auth/"}>
		<Button
			variant="raised"
			className="mail-btn"
			style={{ backgroundColor: "#db3236", color: "white" }}
			onClick = {isServiceConnected ? disconnectService : null}
		>
		{isServiceConnected ? 'disconnect Twitter' : 'connect Twitter'}
		</Button>
	</a>
);
const InstagramButton = (isServiceConnected, disconnectService) => (
	<a href={isServiceConnected ? null : "http://localhost:3001/api/gmail/auth/"}>
		<Button
			variant="raised"
			className="mail-btn"
			style={{ backgroundColor: "#db3236", color: "white" }}
			onClick = {isServiceConnected ? disconnectService : null}
		>
			{isServiceConnected ? 'disconnect Instagram' : 'connect Instagram'}
		</Button>
	</a>
);
export {SlackButton,MailButton,FacebookButton,InstagramButton,GithubButton,TwitterButton,TrelloButton}