import React, { Component } from "react";
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import ServiceCard from "../ServiceCard/ServiceCard";
import "./Step3.css";

class Step3 extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	  this._validate=this._validate.bind(this);
	}
	_validate(value) {
		// a sanitized version of state can be passed instead
		this.props.afterValid("serviceTo",value);
	}
	render() {
		if (this.props.currentStep !== 3) {
			return null;
		}
		const serviceList=this.props.serviceList;
		return (
			<div className="step-3">
				<ServiceCard json={serviceList} validate={this._validate}/>
			</div>
		);
	}
}

const mapStateToProps=state=>{
	return{
		serviceList:state.initial.serviceList
	}
}

export default connect(mapStateToProps)(Step3);
