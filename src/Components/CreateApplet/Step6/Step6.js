//Renders the step 6 for create-applet

import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import "./Step6.css";


//Main class to be exported
class Step6 extends Component {
	render() {
		if (this.props.currentStep !== 6) {
			return null;
		}
		return (
			<div className="step-6">
				<ReviewCard data={this.props.data} afterValid={this.props.afterValid} />
			</div>
		);
	}
}

//This is the individual card that the user sees to confirm his applet
class ReviewCard extends Component {
	constructor(props) {
	  super(props);
	  this.state = {};
	  this._validate=this._validate.bind(this);
	}
	_validate() {
		// a sanitized version of state can be passed instead
		this.props.afterValid(this.state);
	}
	render() {
		const data=this.props.data;
		const action=data.actionHeading;
		const trigger=data.triggerHeading;

		let content="If "+trigger+" then "+action;
		return (
			<div className="review-card">
				<Card className="card">
					<CardContent className="white-text">
						<ServiceLogo />
						<TextArea content={content} />
						<UserName />
					</CardContent>
					<CardContent className="card-footer">
						<div className="right-align">
							<span className="inline">
								<span className="text-inline">Works with</span>{" "}
								<AssignmentIcon />
							</span>
						</div>
					</CardContent>
				</Card>
				<div className="center-button submit-button">
					<Button variant="raised" size="large" color="primary" onClick={this._validate}>
						Finish
					</Button>
				</div>
			</div>
		);
	}
}

//renders the username
const UserName = props => <p className="user-name">by Anshul2166</p>;

//renders the text-area containing the action and trigger of applet
class TextArea extends Component {
	render() {
		return (
			<div className="text-area">
				<textarea>
					{this.props.content}
				</textarea>
				<p className="totalChars">94/140</p>
			</div>
		);
	}
}

//Renders the logo 
class ServiceLogo extends Component {
	render() {
		return (
			<div className="review-card">
				<Avatar>
					<AssignmentIcon />
				</Avatar>
			</div>
		);
	}
}

export default Step6;
