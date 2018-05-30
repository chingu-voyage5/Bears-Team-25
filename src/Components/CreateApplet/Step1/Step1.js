import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import logo from "../../Common/Images/Background.png";
import "./Step1.css";

class Step1 extends Component {
	render() {
		const ServiceList = [
			"Mail",
			"Clock",
			"Twitter",
			"Github",
			"Youtube",
			"Gmail",
			"Instagram",
			"Facebook",
			"Google+",
			"Pininterest"
		];

		const createServiceList = ServiceList.map(service => (
			<Grid item sm={3}>
				<Card className="card">
					<CardMedia image={logo} />
					<CardContent>
						<Typography
							gutterBottom
							variant="headline"
							className="text-center"
							component="h2"
						>
							{service}
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		));
		return (
			<div className="step">
				<div className="text-center">
					<h1>Choose a service</h1>
				</div>
				<div className="text-center">
					<p>Step 1 of 6</p>
				</div>
				<Grid container spacing={24}>
					{createServiceList}
				</Grid>
			</div>
		);
	}
}

export default Step1;
