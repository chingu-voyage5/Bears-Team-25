import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import "./MyApplet.css";

class MyApplet extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		return (
			<div className="my-applet">
				<AppletCard />
			</div>
		);
	}
}

class AppletCard extends Component {
	state = {
		checkedA: true,
		checkedB: true
	};

	handleChange = name => event => {
		this.setState({ [name]: event.target.checked });
	};
	render() {
		return (
			<div className="applet-card">
				<Card className="card">
					<CardContent className="white-text">
						<ServiceLogo />
						<TextArea />
					</CardContent>
					<CardContent className="card-footer">
						<Grid container spacing={24}>
						<Grid sm={8}>
						<span className="left-align">
							Running:<Switch
								checked={this.state.checkedB}
								onChange={this.handleChange("checkedB")}
								value="checkedB"
								color="primary"
							/>
						</span>
						</Grid>
						<Grid sm={4}>
						<span className="right-align">
							<span className="inline">
								<span className="text-inline">Works with</span>{" "}
								<AssignmentIcon className="icon"/>
							</span>
						</span>
						</Grid>
						</Grid>
					</CardContent>
				</Card>
			</div>
		);
	}
}

class TextArea extends Component {
	render() {
		return (
			<div className="text-area">
				<textarea>
					If every hour at 00 minutes past the hour, then send me an
					email at randomemail@gmail.com
				</textarea>
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

export default MyApplet;
