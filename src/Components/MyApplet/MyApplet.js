//This page renders all the applets currently used by user

import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from 'react-redux';
import AppletCard from "../Common/AppletCard/AppletCard";
import * as myAppletActions from "../../actions/myAppletActions";
import { bindActionCreators } from "redux";
import ButtonApplet from "../ButtonApplet/ButtonApplet";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import "./MyApplet.css";


class MyApplet extends Component {
	componentWillMount() {
    	this.props.myApplet.myAppletActions();//gets all the applets to the redux store
  	}
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		let name = localStorage.getItem('name')
		if (!name) {
			return <Redirect to='/' />
		}
		const appletList =this.props.appletList;
		const AppletList = appletList.map( (applet, i) => (
			<AppletCard key={`applet-list-${i}`} content={applet.content} deleteApplet = {this.props.myApplet.deletingApplet}
			 serviceFrom = {applet.option.watchFrom}  serviceTo = {applet.option.watchTo} id = {applet._id} />
		));
		return (
			<div className="my-applet">
				<div className="text-center">
					<h1>Your applets</h1>
					<Link  to='/createapplet'> <Button variant="raised" color="primary">Create applet</Button></Link>
				</div>
				<Grid  container spacing={24}>
				<Grid item sm={4}>
					<ButtonApplet />
				</Grid>
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
