import React, { Component } from "react";
import { connect } from 'react-redux';
import ServiceCard from "../ServiceCard/ServiceCard";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
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
		const {servicesSubscribed} = this.props;
		let servicesWithActions = servicesSubscribed.filter(service => service.isActions)
		// leave only array with service names
		servicesWithActions =  servicesWithActions.map(service => service.service)


		if (this.props.currentStep !== 3) {
			return null;
		}
		// const serviceList=this.props.serviceList;
		return (
			<div>
				<div className="text-center">
					<Link  to='/services'> <Button variant="raised" color="primary">Add more services</Button></Link>
				</div>
				<div className="step-3">
					<ServiceCard json={servicesWithActions} validate={this._validate}/>
				</div>
			</div>
		);
	}
}

const mapStateToProps=state=>{
	return{
		servicesSubscribed: state.auth.servicesSubscribed
		// serviceList:state.service.serviceList
	}
}

export default connect(mapStateToProps)(Step3);
