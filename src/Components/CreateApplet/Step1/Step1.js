//Renders the step 1 for create-applet

import React, { Component } from "react";
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import ServiceCard from "../ServiceCard/ServiceCard";
import "./Step1.css";

class Step1 extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	  this._validate=this._validate.bind(this);
	}
	_validate() {
		// a sanitized version of state can be passed instead
		this.props.afterValid(this.state);
		console.log("Clicked");
	}
	render() {
		if (this.props.currentStep !== 1) {
			return null;
		}
		const serviceList=this.props.serviceList;
		return (
			<div className="step-1">
				<ServiceCard json={serviceList} validate={this._validate}/>
			</div>
		);
	}
}

const mapStateToProps=state=>{
	return{
		serviceList:state.serviceList
	}
}

export default connect(mapStateToProps)(Step1);
