//Renders the step 4 for create-applet

import React,{Component} from "react";
import { connect } from 'react-redux';
import ActionCard from "../ActionCard/ActionCard";

class Step4 extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	  this._validate=this._validate.bind(this);
	}
	_validate(key1,value1,key2,value2) {
		// a sanitized version of state can be passed instead
		this.props.afterValid(key1,value1,key2,value2);
		console.log("Clicked");
	}
	render(){
		const service="mail";
		const serviceAction = this.props.serviceAction[service];
		console.log(serviceAction);
		console.log("here");

		if (this.props.currentStep !== 4) {
			return null;
		}
		return(
			<div className="step-4">
				<ActionCard json={serviceAction} validate={this._validate}/>
			</div>
		);
	}
}

const mapStateToProps=state=>{
	return{
		serviceAction:state.serviceAction
	}
}

export default connect(mapStateToProps)(Step4);
