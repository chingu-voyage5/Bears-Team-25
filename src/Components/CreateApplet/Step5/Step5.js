import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import "./Step5.css";

class Step5 extends Component {
	render() {
		return (
			<div className="step-5">
				<div className="text-center">
					<h1>Action Field</h1>
				</div>
				<div className="text-center">
					<p>Step 5 of 6</p>
				</div>
				<div className="text-center">
					<ActionFieldCard />
				</div>
			</div>
		);
	}
}

class ActionFieldCard extends Component {
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
							<span className="white-text">
								This Action will send you an HTML based email.
								Images and links are supported.
							</span>
						</Typography>
						<DataField
							label="Subject:"
							input="input"
							btnText="button-text"
						/>
						<DataField
							label="Body:"
							input="textArea"
							btnText="button-text"
						/>
					</CardContent>
					<CardActions>
						<div className="center-button">
							<Button
								className="white-button submit-btn add-btn"
								size="large"
								color="primary"
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

const DataField = props => {
	const dataBox =
		props.input == "input" ? (
			<span className="text-center">
				<br />
				<input />
			</span>
		) : (
			<div className="text-center">
				<textarea />
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
