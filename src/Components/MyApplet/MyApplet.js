//This page renders all the applets currently used by user

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
import { connect } from 'react-redux';
import "./MyApplet.css";

class MyApplet extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		const appletList =this.props.appletList;
		console.log(appletList);
		const AppletList = appletList.map(applet => (
			<AppletCard content={applet.content} />
		));
		return (
			<div className="my-applet">
				<Grid container spacing={24}>
					{AppletList}
				</Grid>
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
		console.log(this.props.content);
		return (
			<Grid item sm={4}>
				<div className="applet-card">
					<Card className="card">
						<CardContent className="white-text">
							<ServiceLogo />
							<TextArea content={this.props.content} />
						</CardContent>
						<CardContent className="card-footer">
							<Grid container spacing={24}>
								<Grid item sm={7}>
									<span className="left-align">
										Running:<Switch
											checked={this.state.checkedB}
											onChange={this.handleChange(
												"checkedB"
											)}
											value="checkedB"
											color="primary"
										/>
									</span>
								</Grid>
								<Grid item sm={5}>
									<span className="right-align">
										<span className="inline">
											<span className="text-inline">
												Works with
											</span>{" "}
											<AssignmentIcon className="icon" />
										</span>
									</span>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</div>
			</Grid>
		);
	}
}

class TextArea extends Component {
	render() {
		return (
			<div className="text-area">
				<textarea>{this.props.content}</textarea>
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

const mapStateToProps=state=>{
	return{
		appletList:state.create.appletList
	}
}

export default connect(mapStateToProps)(MyApplet);
