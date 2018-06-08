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
import AppletCard from "../Common/AppletCard/AppletCard";
import "./MyApplet.css";

class MyApplet extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		const appletList =this.props.appletList;

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

const mapStateToProps=state=>{
	return{
		appletList:state.create.appletList
	}
}

export default connect(mapStateToProps)(MyApplet);
