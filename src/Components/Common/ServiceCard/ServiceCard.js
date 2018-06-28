import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import * as Icons from "../Icons/Icons";
import * as Colors from "../Colors/Colors";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import * as serviceButtons from "../ServiceButtons/ServiceButtons";
import "./ServiceCard.css";

class ServiceCard extends Component {
	render() {
		let serviceName = this.props.serviceName;
		let serviceNameButton = serviceName + "Button";
		console.log("Service Button Name:" + serviceNameButton);
		const ServiceButton = serviceButtons[serviceNameButton];

		let iconName = serviceName + "Icon";
		const IconName = Icons[iconName];

		return (
			<div className="service-card">
				<Grid container spacing={24}>
					<Grid item md={2} />
					<Grid item md={8}>
						<Card
							className="card"
							style={{ backgroundColor: Colors[serviceName] }}
						>
							<Grid container spacing={24}>
								<Grid item md={2}>
									<CardContent>
										<Typography
											gutterBottom
											variant="headline"
											component="h1"
										>
											<Grid container spacing={24}>
												<Grid
													item
													sm={8}
													className="icon-container"
												>
													<IconName className="icon" />
												</Grid>
											</Grid>
										</Typography>
									</CardContent>
								</Grid>
								<Grid item md={10}>
									<CardContent>
										<h2>{serviceName}</h2>
										{ServiceButton}
									</CardContent>
								</Grid>
							</Grid>
						</Card>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default ServiceCard;
