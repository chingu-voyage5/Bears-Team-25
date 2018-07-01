//renders a component in which the users can be able to connect to various different services
//Bascially a component in which various service cards are mapped in.
import React,{Component} from "react";
import { connect } from 'react-redux';
import ServiceCard from "../Common/ServiceCard/ServiceCard";
import { Redirect } from 'react-router';

class Services extends Component{
	constructor(props) {
	  super(props);
	  this.state = {};
	}
	render() {
		let name = localStorage.getItem('name');
		if (!name) return <Redirect to='/' />;

		const {servicesSubscribed, servicesNotSubscribed} = this.props
		const connectedServices = servicesSubscribed.map( (service, i) => (
			<ServiceCard key={i} serviceName={service.service} isServiceConnected = {true}/>
		));
		const notConnectedServices = servicesNotSubscribed.map( (service, i) => (
			<ServiceCard key={i} isServiceConnected = {false} serviceName={service} />
		));
		return (
			<div className="service-page">
				<h1 className="text-center" style={{margin:"80px 0px"}}>Already Connected Services</h1>
				{connectedServices}
				<h1 className="text-center" style={{margin:"80px 0px"}}>Not Yet Connected Services</h1>
				{notConnectedServices}
			</div>
		);
	}
}

const mapStateToProps=state=>{
	return{
		servicesSubscribed:state.auth.servicesSubscribed,
		servicesNotSubscribed: state.auth.servicesNotSubscribed
	}
}

export default connect(mapStateToProps)(Services);