//Renders the step 1 for create-applet

import React, { Component } from "react";
import { connect } from 'react-redux';
import ServiceCard from "../ServiceCard/ServiceCard";
import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import "./Step1.css";

class Step1 extends Component {
	// componentWillMount(){
	// 	this.props.serviceActions.listServices();
	// }
	constructor(props) {
	  super(props);
	  this.state = {};
	  this._validate=this._validate.bind(this);
	}
	_validate(value) {
		this.props.afterValid("serviceFrom",value);
	}
	render() {
		let name = localStorage.getItem('name');
		if (!name) return <Redirect to='/' />;

		const {servicesSubscribed} = this.props;
		let servicesWithWebhooks = servicesSubscribed.filter(service => service.isWebhooks)
		// leave only array with service names
		servicesWithWebhooks =  servicesWithWebhooks.map(service => service.service)

		if (this.props.currentStep !== 1) {
			return null;
		}
		// const serviceList=this.props.serviceList;
		return (
			<div>
				<div className="text-center">
					<Link  to='/services'> <Button variant="raised" color="primary">Add more services</Button></Link>
				</div>
				<div className="step-1">
					<ServiceCard json={servicesWithWebhooks} validate={this._validate}/>
				</div>
			</div>
		);
	}
}

const mapStateToProps=state=>{
	return{
		// serviceList:state.service.serviceList,
		servicesSubscribed: state.auth.servicesSubscribed
	}
}
const mapActionsToProps = dispatch => {
  return {
		//serviceActions: bindActionCreators(serviceActions, dispatch)
		
  };
};
export default connect(mapStateToProps,mapActionsToProps)(Step1);
