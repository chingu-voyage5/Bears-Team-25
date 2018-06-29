//Renders the step 1 for create-applet

import React, { Component } from "react";
import { connect } from 'react-redux';
import ServiceCard from "../ServiceCard/ServiceCard";
import * as serviceActions from "../../../actions/serviceActions";
import { bindActionCreators } from "redux";
import "./Step1.css";

class Step1 extends Component {
	componentWillMount(){
		this.props.serviceActions.listServices();
	}
	constructor(props) {
	  super(props);
	
	  this.state = {};
	  this._validate=this._validate.bind(this);
	}
	_validate(value) {
		this.props.afterValid("serviceFrom",value);
		console.log("Service from value is "+value);
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
		serviceList:state.service.serviceList
	}
}
const mapActionsToProps = dispatch => {
  return {
    serviceActions: bindActionCreators(serviceActions, dispatch)
  };
};
export default connect(mapStateToProps,mapActionsToProps)(Step1);
