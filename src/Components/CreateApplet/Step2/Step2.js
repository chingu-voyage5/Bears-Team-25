//Renders the step 2 for create-applet

import React,{Component} from "react";
import { connect } from 'react-redux';
import ActionCard from "../ActionCard/ActionCard";

class Step2 extends Component{
	constructor(props) {
	  super(props);
	  this.state = {};
	  this._validate=this._validate.bind(this);
	}
	_validate(key1,value1,key2,value2) {
		//validates and sends to next
		this.props.afterValid(key1,value1,key2,value2);
	}
	render(){
		const service=this.props.service;
		const TriggerList = this.props.TriggerList[service];
		if (this.props.currentStep !== 2) {
			return null;
		}
		return(
			<div className="step-2">
				<ActionCard json={TriggerList} validate={this._validate} step="2"/>
			</div>
		);
	}
}

const mapStateToProps=state=>{
	return{
		TriggerList:state.initial.serviceTrigger
	}
}

export default connect(mapStateToProps)(Step2);