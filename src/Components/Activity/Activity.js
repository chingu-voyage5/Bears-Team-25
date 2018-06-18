import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AssignmentIcon from "mdi-react/AssignmentIcon";
import * as Icons from "../Common/Icons/Icons";
import * as Colors from "../Common/Colors/Colors";
import * as myActivityActions from "../../actions/myActivityActions";
import { bindActionCreators } from "redux";
import "./Activity.css";

class Activity extends Component {
	componentWillMount() {
    	this.props.myActivity.myActivityActions();
  	}
	render() {
		let activityList = this.props.activityList;
		activityList.reverse();
		const allActivityList = activityList.map((activity, i) => 
			<ActivityRow key={`activity-row-${i}`} activity={activity}/>
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
		var date = new Date(this.props.activity.date);//get date from timestamp
		date=date.toLocaleString();//get date in user-readable format
		return (
			<div className="activity-row">
				<Grid container spacing={24}>
					<Grid item sm={1} className="icon">
						<AssignmentIcon />
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
								{date}
							</Typography>
						</CardContent>
					</Grid>
				</Grid>
				<Grid container spacing={24}>
					<Grid item sm={1} />
					<Grid item sm={8}>
						<ActivityCard serviceName={this.props.activity.serviceFrom} />
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
		console.log(serviceNameIcon);
		const IconName = Icons[serviceNameIcon];

		return (
			<div className="activity-card">
				<Card className="card" style={{backgroundColor:Colors[serviceName]}}>
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
		activityList: state.activity.activityList
	};
};
const mapActionsToProps = dispatch => {
  return {
    myActivity: bindActionCreators(myActivityActions, dispatch)
  };
};
export default connect(mapStateToProps,mapActionsToProps)(Activity);
