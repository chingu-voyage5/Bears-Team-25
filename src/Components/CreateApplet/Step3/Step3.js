import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ServiceCard from "../ServiceCard/ServiceCard";
import "./Step3.css";

class Step1 extends Component {
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

		return (
			<div className="step-3">
				<ServiceCard json={ServiceList} />
			</div>
		);
	}
}

export default Step1;
