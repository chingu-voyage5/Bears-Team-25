//Renders the service card:- card for particular service.
//Used in step1 and step3 of create-applet

import React,{Component} from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faCoffee from "@fortawesome/fontawesome-free-solid/faCoffee";
import './ServiceCard.css';

class ServiceCard extends Component{
	constructor(props) {
	  super(props);
	  this.state = {};
	  this._validate=this._validate.bind(this);
	}
	_validate(e){
		e.preventDefault();
		// console.log(e.currentTarget.getAttribute('value'));
		let value=e.currentTarget.getAttribute('value')
		this.props.validate(value);

	}
	render(){
		const ServiceList=this.props.json;

		const createServiceList = ServiceList.list.map(service => (
			<Grid item sm={3}>
				<Card className="card" value={service.name} style={{backgroundColor:service.color}} onClick={((e)=>this._validate(e))}>
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
	
		return(
			<div className="service-card">
				<Grid container spacing={24}>
				{createServiceList}
				</Grid>
			</div>
		);
	}
}
export default ServiceCard;