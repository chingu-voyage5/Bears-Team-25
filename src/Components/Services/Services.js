import React,{Component} from "react";
import { connect } from 'react-redux';
import * as serviceActions from "../../actions/serviceActions";
import ServiceCard from "../Common/ServiceCard/ServiceCard";
import { bindActionCreators } from "redux";

class Services extends Component{
	render() {
		const serviceList=this.props.serviceList;
		const services = serviceList.map( (serviceName, i) => (
			<ServiceCard key={i} serviceName={serviceName} />
		));
		return (
			<div className="service-page">
				<h1 className="text-center">Here is the list of services we offer</h1>
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
// const mapActionsToProps = dispatch => {
//   return {
//     serviceActions: bindActionCreators(serviceActions, dispatch)
//   };
// };

export default connect(mapStateToProps)(Services);