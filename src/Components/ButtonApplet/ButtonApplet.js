import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import Slack from '../Slack/slackComponent';
import "./ButtonApplet.css";

class ButtonApplet extends Component {
	render() {
		return (
			<div className="button-applet-card text-center">
				<Card className="card">
					<CardContent className="card-content-title text">
						<Typography component="p">
							You are going to alert your team now with our slack
							and mail integration
						</Typography>
						<br />
						<Typography component="p">
							Press the button below to send the emergency message
						</Typography>
					</CardContent>
					<CardContent>
						<Slack />
					</CardContent>
				</Card>				
			</div>
		);
	}
}

export default ButtonApplet;
