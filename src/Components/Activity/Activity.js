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
import "./Activity.css";

class Activity extends Component {
	render() {
		const activityList = this.props.activityList;
		return (
			<div className="activity-page">
				<Grid container spacing={24}>
					<Grid item sm={1} className="icon">
						<FacebookIcon />
					</Grid>
					<Grid item sm={11}>
						<h1>Service Connected</h1>
					</Grid>
					<Grid item sm={1} />
					<Grid item sm={11}>
						<ActivityCard />
					</Grid>
				</Grid>
			</div>
		);
	}
}

class ActivityCard extends Component {
	render() {
		return (
			<div>
				<Card>
					<CardMedia
						image="/static/images/cards/contemplative-reptile.jpg"
						title="Contemplative Reptile"
					/>
					<CardContent>	
						<Typography
							gutterBottom
							variant="headline"
							component="h2"
						>
							Lizard
						</Typography>
					</CardContent>
					<CardContent className="card-footer">
						You connected the github service
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
