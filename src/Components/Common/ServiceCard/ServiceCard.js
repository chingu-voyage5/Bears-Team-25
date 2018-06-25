import React,{Component} from "react";
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
import './ServiceCard.css';

class ServiceCard extends Component {
	render() {
		let serviceName=this.props.serviceName;
		let serviceNameIcon = serviceName + "Icon";
		console.log(serviceNameIcon);
		const IconName = Icons[serviceNameIcon];
		return (
			<div className="service-card">
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
						<Button variant="raised" className="mail-btn" style={{backgroundColor: '#db3236', color: 'white'}}>Connect the service</Button>
					</CardContent>
				</Card>
			</div>
		);
	}
}

export default ServiceCard;