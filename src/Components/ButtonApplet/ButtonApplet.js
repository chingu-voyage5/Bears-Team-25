//renders the button applet 

import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Options from '../Options/optionsComponent';
import { Redirect } from "react-router";
import "./ButtonApplet.css";

class ButtonApplet extends Component {
	render() {
		let name = localStorage.getItem("name");
		if (!name) return <Redirect to="/" />;
		return (
			<div className="button-applet-card text-center">
				<Card className="card">
					<CardContent className="card-content-title text">
						<Typography component="p">
							You are going to alert your team now with our slack
							and mail integration
						</Typography>
						<br />
						<Typography component="p">
							Press the button below to send the emergency message
						</Typography>
					</CardContent>
					<CardContent>
						<Options />
					</CardContent>
				</Card>				
			</div>
		);
	}
}

export default ButtonApplet;
