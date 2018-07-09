//Renders the step 6 for create-applet

import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import * as Icons from "../../Common/Icons/Icons";
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
		const serviceFrom = data.serviceFrom;
		const serviceTo = data.serviceTo;
		let iconNameTo = serviceTo + "Icon";
		const IconNameTo = Icons[iconNameTo];

		let content="If "+trigger+" then "+action;
		return (
			<div className="review-card">
				<Card className="card">
					<CardContent className="white-text">
						<ServiceLogo serviceFrom={serviceFrom}/>
						<TextArea content={content} />
						<UserName />
					</CardContent>
					<CardContent className="card-footer">
						<div className="right-align">
							<span className="inline">
								<span className="text-inline">Works with</span>{" "}
								<IconNameTo color='white' className="icon" />
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
const UserName = props => {
	let name = localStorage.getItem('name');
	return <p className="user-name">by {name}</p>};

//renders the text-area containing the action and trigger of applet
class TextArea extends Component {
	render() {
		return (
			<div className="text-area" >
				<textarea defaultValue={this.props.content}>
				</textarea>
				<p className="totalChars">94/140</p>
			</div>
		);
	}
}

//Renders the logo 
class ServiceLogo extends Component {
	render() {
		const {serviceFrom} = this.props;
		let iconNameFrom = serviceFrom + "Icon";
		const IconNameFrom = Icons[iconNameFrom];
		return (
			<div className="review-card">
				<Avatar>
					<IconNameFrom color='white' className="icon"  />
				</Avatar>
			</div>
		);
	}
}

export default Step6;
