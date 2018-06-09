//Renders the action card:- card for particular trigger/action
//Used in step2 and 4 of create-applet
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import './ActionCard.css';

class ActionCard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this._validate=this._validate.bind(this);
	}
	_validate(action){
		const heading=action.heading;
		const content=action.content;

		if(this.props.step==="2"){
			this.props.validate("triggerHeading",heading,"triggerContent",content);
		}
		else{
			this.props.validate("actionHeading",heading,"actionContent",content);	
		}
	}
	render() {
		console.log(this.props.json);
		const ActionList = this.props.json.map(action => (
				<Grid item md={4} sm={6}>
					<Card className="action-card" onClick={()=>this._validate(action)}>
						<CardContent>
							<h2>
								{action.heading}
							</h2>
							<p>
								{action.content}
							</p>
						</CardContent>
					</Card>
				</Grid>
		));
		return (
			<div className="Actions">
				<Grid container spacing={24}>
					{ActionList}
				</Grid>
			</div>
		);
	}
}

export default ActionCard;
