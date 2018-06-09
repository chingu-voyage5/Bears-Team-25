//This page renders all the applets currently used by user

import React, { Component } from "react";
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
				<div className="text-center">
					<h1>Your applets</h1>
				</div>
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
