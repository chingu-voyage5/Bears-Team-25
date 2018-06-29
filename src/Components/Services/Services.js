//renders a component in which the users can be able to connect to various different services
//Bascially a component in which various service cards are mapped in.
import React,{Component} from "react";
import { connect } from 'react-redux';
import ServiceCard from "../Common/ServiceCard/ServiceCard";

class Services extends Component{
	constructor(props) {
	  super(props);
	  this.state = {};
	  this.connectService=this.connectService.bind(this);
	}
	render() {
		const serviceList=this.props.serviceList;
		const services = serviceList.map( (serviceName, i) => (
			<ServiceCard key={i} serviceName={serviceName} />
		));
		return (
			<div className="service-page">
				<h1 className="text-center" style={{margin:"80px 0px"}}>Here is the list of services we offer</h1>
				{services}
			</div>
		);
	}
}

const mapStateToProps=state=>{
	return{
		serviceList:state.service.allServiceList
	}
}

export default connect(mapStateToProps)(Services);