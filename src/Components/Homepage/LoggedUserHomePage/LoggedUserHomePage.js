import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import AppletCard from "../../Common/AppletCard/AppletCard";
import { connect } from "react-redux";
import * as listAppletAction from "../../../actions/listAppletAction";
import { bindActionCreators } from "redux";
import "./LoggedUserHomePage.css";

class LoggedUserHomePage extends Component {
	componentWillMount() {
    	this.props.listActions.listApplets();
  	}
	render() {
		const appletList = this.props.allAppletList;
		console.log(appletList);
		const AppletList = appletList.map( (applet, i) => (
			<AppletCard key={`appletCard-${i}`}  content={applet.content} />
		));
		return (
			<div className="logged-home-page">
				<div className="text-center">
					<h1>Recommended for you</h1>
				</div>
				<Grid container spacing={24}>
					{AppletList}
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		allAppletList: state.applet.appletList
	};
};

const mapActionsToProps = dispatch => {
  return {
    listActions: bindActionCreators(listAppletAction, dispatch)
  };
};


export default connect(mapStateToProps,mapActionsToProps)(LoggedUserHomePage);
