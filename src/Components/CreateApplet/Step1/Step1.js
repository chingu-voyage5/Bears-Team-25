import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import logo from "../../Common/Images/Background.png";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faCoffee from "@fortawesome/fontawesome-free-solid/faCoffee";
import "./Step1.css";

class Step1 extends Component {
	render() {
		const ServiceList = {
			people: [
				{
					name: "Mail",
					color: "red"
				},
				{
					name: "Mail",
					color: "red"
				},
				{
					name: "Mail",
					color: "red"
				},
				{
					name: "Mail",
					color: "red"
				},
				{
					name: "Mail",
					color: "red"
				},
				{
					name: "Mail",
					color: "red"
				},
				{
					name: "Mail",
					color: "red"
				},
				{
					name: "Mail",
					color: "red"
				},
				{
					name: "Mail",
					color: "red"
				}
			]
		};

		const createServiceList = ServiceList.people.map(service => (
			<Grid item sm={3}>
				<Card className="card">
					<div className="text-center media-icon">
						<CardMedia>
							<FontAwesomeIcon icon={faCoffee} size="6x" />
						</CardMedia>
					</div>
					<CardContent>
						<Typography
							gutterBottom
							variant="headline"
							className="text-center"
							component="h2"
						>
							{service.name}
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
