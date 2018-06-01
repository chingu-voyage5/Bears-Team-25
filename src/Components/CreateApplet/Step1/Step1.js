import React, { Component } from "react";
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
		const ServiceList = {
			list: [
				{
					name: "Mail",
					color: "maroon"
				},
				{
					name: "Twitter",
					color: "blue"
				},
				{
					name: "Facebook",
					color: "Green"
				},
				{
					name: "Youtube",
					color: "maroon"
				},
				{
					name: "Google+",
					color: "green"
				},
				{
					name: "Instagram",
					color: "blue"
				}
			]
		};
		if (this.props.currentStep !== 1) {
			return null;
		}
		return (
			<div className="step-1">
				<ServiceCard json={ServiceList} validate={this._validate}/>
			</div>
		);
	}
}

export default Step1;
