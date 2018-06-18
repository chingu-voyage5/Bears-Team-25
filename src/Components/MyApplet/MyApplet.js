//This page renders all the applets currently used by user

import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from 'react-redux';
import AppletCard from "../Common/AppletCard/AppletCard";
import * as myAppletActions from "../../actions/myAppletActions";
import { bindActionCreators } from "redux";
import "./MyApplet.css";

class MyApplet extends Component {
	componentWillMount() {
    	this.props.myApplet.myAppletActions();
  	}
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const appletList =this.props.appletList;
		console.log("The applet list");
		console.log(appletList);
		const AppletList = appletList.map( (applet, i) => (
			<AppletCard key={`applet-list-${i}`} content={applet.content} />
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
		appletList:state.applet.myApplet
	}
}
const mapActionsToProps = dispatch => {
  return {
    myApplet: bindActionCreators(myAppletActions, dispatch)
  };
};
export default connect(mapStateToProps,mapActionsToProps)(MyApplet);
