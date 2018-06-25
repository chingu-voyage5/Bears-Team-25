//Renders the service card:- card for particular service.
//Used in step1 and step3 of create-applet

import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import * as Icons from "../../Common/Icons/Icons";
import * as Colors from "../../Common/Colors/Colors";
import "./ServiceCard.css";

class ServiceCard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this._validate = this._validate.bind(this);
	}
	_validate(service) {
		let value = service.name;
		console.log(value);
		this.props.validate(value);
	}
	render() {
		const ServiceList = this.props.json;
		const createServiceList = ServiceList.map(function(service, index) {
			let serviceName=service;
			serviceName = serviceName.replace(/&/g,"");
			let serviceIcon=serviceName+"Icon";
			const IconName=Icons[serviceIcon];
			return (
				<Grid key={`server-list-${index}`} item sm={3}>
					<Card
						className="card"
						value={serviceName}
						style={{ backgroundColor: Colors[serviceName] }}
						onClick={this._validate.bind(this,service)}
					>
						<div className="text-center media-icon">
							<IconName />
						</div>
						<CardContent>
							<Typography
								gutterBottom
								variant="headline"
								className="text-center"
								component="h2"
								style={{ color: "#fff" }}
							>
								{serviceName}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			);
		}.bind(this));

		return (
			<div className="service-card">
				<Grid container spacing={24}>
					{createServiceList}
				</Grid>
			</div>
		);
	}
}
export default ServiceCard;
