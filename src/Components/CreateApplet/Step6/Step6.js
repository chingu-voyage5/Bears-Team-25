import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import './Step6.css';

class Step6 extends Component {
	render() {
		if (this.props.currentStep !== 6) {
			return null;
		}
		return (
			<div className="step-6">
				<ReviewCard />
			</div>
		);
	}
}

class ReviewCard extends Component {
	render() {
		return (
			<div className="review-card">
				<Card className="card">
					<CardContent className="white-text">
						<ServiceLogo />
						<TextArea />
						<UserName />
					</CardContent>
					<CardContent className="card-footer">
						<div className="right-align">
						<span className="inline"><span className="text-inline">Works with</span> <AssignmentIcon /></span>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}
}

const UserName=props=>(
	<p className="user-name">by Anshul2166</p>
);

class TextArea extends Component{
	render() {
		return (
			<div className="text-area">
				<textarea>If every hour at 00 minutes past the hour, then send me an email at randomemail@gmail.com</textarea>
				<p className="totalChars">94/140</p>
			</div>
		);
	}
}

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