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
						<select>
							<option value="volvo">Volvo</option>
							<option value="saab">Saab</option>
							<option value="mercedes">Mercedes</option>
							<option value="audi">Audi</option>
						</select>
					</CardContent>
					<CardContent className="white-text">
						<TextArea content={this.props.content} />
					</CardContent>
					<CardContent>
						
					</CardContent>
				</Card>
				<Slack />
			</div>
		);
	}
}

class TextArea extends Component {
	render() {
		return (
			<div className="button-area">
				<Button variant="contained" color="primary">
					<span className="send-text">Send</span>
					<Icon>send</Icon>
				</Button>
			</div>
		);
	}
}

export default ButtonApplet;
