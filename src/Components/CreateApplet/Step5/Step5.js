import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";	
import Typography from "@material-ui/core/Typography";
import "./Step5.css";

class Step5 extends Component {
	render() {
		if (this.props.currentStep !== 5) {
			return null;
		}
		return (
			<div className="step-5">
				<div className="text-center">
					<ActionFieldCard afterValid={this.props.afterValid}/>
				</div>
			</div>
		);
	}
}

//Renders an individual action-field-card
class ActionFieldCard extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	heading:"",
	  	data:""
	  };

	  this._validate=this._validate.bind(this);
	  this.updateInputValueHeading=this.updateInputValueHeading.bind(this);
	  this.updateInputValueContent=this.updateInputValueContent.bind(this);
	}
	updateInputValueHeading(evt){
		this.setState({heading:evt.target.value});
	}
	updateInputValueContent(evt){
		this.setState({data:evt.target.value});
	}
	_validate() {
		// a sanitized version of state can be passed instead
		let json={};
		let key='field';
		json[key]=[];
		let payload={
			heading:this.state.heading,
			content:this.state.data
		};
		json[key].push(payload);
		this.props.afterValid(json);
	}
	render() {
		return (
			<div className="action-field-card">
				<Card className="card">
					<CardContent className="white-text">
						<Typography
							gutterBottom
							variant="headline"
							component="h1"
						>
							<span className="white-text">Send me an email</span>
						</Typography>
						<Typography component="p">
							<span className="white-text text">
								This Action will send you an HTML based email.
								Images and links are supported.
							</span>
						</Typography>
						<DataField
							label="Subject:"
							input="input"
							btnText="button-text"
							value={this.state.heading}
							updateInputValue={this.updateInputValueHeading}
						/>
						<DataField
							label="Body:"
							input="textArea"
							btnText="button-text"
							value={this.state.data}
							updateInputValue={this.updateInputValueContent}
						/>
					</CardContent>
					<CardActions>
						<div className="center-button">
							<Button
								className="white-button submit-btn add-btn"
								size="large"
								color="primary"
								onClick={this._validate}
							>
								Create action
							</Button>
						</div>
					</CardActions>
				</Card>
			</div>
		);
	}
}

//Renders the data field component, containing the heading of input, the input/textarea and the add ingredient button
const DataField = props => {
	const dataBox =
		props.input === "input" ? (
			<span className="text-center">
				<br />
				<input value={props.value} onChange={evt => props.updateInputValue(evt)} />
			</span>
		) : (
			<div className="text-center">
				<textarea value={props.value} onChange={evt => props.updateInputValue(evt)}/>
			</div>
		);

	return (
		<div className="data-field">
			<strong className="label">{props.label}</strong>
			{dataBox}
			<div className="right-align">
				<Button
					className="white-button add-btn"
					size="small"
					color="primary"
				>
					Add ingredient
				</Button>
			</div>
		</div>
	);
};

export default Step5;
