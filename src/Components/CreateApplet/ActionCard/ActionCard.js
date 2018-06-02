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
	}
	render() {
		const ActionList = this.props.json.list.map(action => (
				<Grid item sm={3}>
					<Card className="action-card"  onClick={this.props.validate}>
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
