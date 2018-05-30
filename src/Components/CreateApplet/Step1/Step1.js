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

		const createServiceList = ServiceList.list.map(service => (
			<Grid item sm={3}>
				<Card className="card" style={{backgroundColor:service.color}}>
					<div className="text-center media-icon">
						<CardMedia>
							<FontAwesomeIcon icon={faCoffee} size="6x" style={{color:"#fff"}}/>
						</CardMedia>
					</div>
					<CardContent>
						<Typography
							gutterBottom
							variant="headline"
							className="text-center"
							component="h2"
							style={{color:"#fff"}}
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
