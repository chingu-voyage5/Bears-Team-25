import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Save from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import "./ButtonApplet.css";

class ButtonApplet extends Component {
	state = {
		checkedA: true,
		checkedB: true
	};

	handleChange = name => event => {
		this.setState({ [name]: event.target.checked });
	};
	render() {
		return (
				<div className="button-applet-card">
					<Card className="card">
						<CardContent className="white-text">
							<TextArea content={this.props.content} />
						</CardContent>
					</Card>
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
