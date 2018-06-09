import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FacebookIcon from "mdi-react/FacebookIcon";
import * as Icons from "../Common/Icons/Icons";
import "./Activity.css";

class Activity extends Component {
	render() {
		const activityList = this.props.activityList;
		const allActivityList = activityList.map((activity) => 
			<ActivityRow serviceName={activity.serviceName} />
		);
		return (
			<div className='activity-page'>
				{allActivityList}
			</div>
		);
	}
}

class ActivityRow extends Component{
	render() {
		return (
			<div className="activity-row">
				<Grid container spacing={24}>
					<Grid item sm={1} className="icon">
						<FacebookIcon />
					</Grid>
					<Grid item sm={11}>
						<CardContent>
							<Typography variant="headline">
								Service Connected
							</Typography>
							<Typography
								variant="subheading"
								color="textSecondary"
							>
								Jun 08,2018
							</Typography>
						</CardContent>
					</Grid>
				</Grid>
				<Grid container spacing={24}>
					<Grid item sm={1} />
					<Grid item sm={11}>
						<ActivityCard serviceName={this.props.serviceName} />
					</Grid>
				</Grid>
			</div>
		);
	}
}

class ActivityCard extends Component {
	render() {
		let serviceName=this.props.serviceName;
		let serviceNameIcon = serviceName + "Icon";
		const IconName = Icons[serviceNameIcon];
		return (
			<div className="activity-card">
				<Card>
					<CardContent>
						<Typography
							gutterBottom
							variant="headline"
							component="h1"
						>
							<Grid container spacing={24}>
							<Grid item sm={8}>
								<IconName /><span className="service-name">{serviceName}</span>
							</Grid>
							</Grid>

						</Typography>
					</CardContent>
					<CardContent className="card-footer">
						You connected the {serviceName} service
					</CardContent>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		activityList: state.activity
	};
};

export default connect(mapStateToProps)(Activity);
