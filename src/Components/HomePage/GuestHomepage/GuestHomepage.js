import React, {Component} from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import logo from "../../Common/Images/Background.png";
import "./GuestHomepage.css";

class GuestHomepage extends Component{
	constructor(props) {
	  super(props);
	  this.state = {};
	}
	render(){
		return(
			<div className="guest-homepage">
				<FeatureRow />
			</div>
		);
	}
}

class FeatureRow extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}
	render(){
		return(
		<div className="feature-row">
			<Grid container spacing={24}>
				<Grid item sm={4}>
					<h1>A world that works for you</h1>
					<p>IFTTT is the free way to get all your apps and devices talking to each other. Not everything on the internet plays nice, so we're on a mission to build a more connected world.</p>
				</Grid>
				<Grid item sm={2}>
				</Grid>
				<Grid item sm={6}>
					<img src={logo} className="logo"/>
				</Grid>
			</Grid>
		</div>
		);
	}
}

export default GuestHomepage;