//Renders the step 2 for create-applet

import React,{Component} from "react";
import ActionCard from "../ActionCard/ActionCard";

class Step2 extends Component{
	constructor(props) {
	  super(props);
	  this.state = {};
	  this._validate=this._validate.bind(this);
	}
	_validate() {
		//validates and sends to next
		this.props.afterValid(this.state);
		console.log("Clicked");
	}
	render(){
		const TriggerList = {
			list: [
				{
					heading:"Card added to board",
					content:"This trigger fires every time a card is added to a board"
				},
				{
					heading:"Card added to board",
					content:"This trigger fires every time a card is added to a board"
				},
				{
					heading:"Card added to board",
					content:"This trigger fires every time a card is added to a board"
				},
				{
					heading:"Card added to board",
					content:"This trigger fires every time a card is added to a board"
				},
				{
					heading:"Card added to board",
					content:"This trigger fires every time a card is added to a board"
				},
				{
					heading:"Card added to board",
					content:"This trigger fires every time a card is added to a board"
				}
			]
		};
		if (this.props.currentStep !== 2) {
			return null;
		}
		return(
			<div className="step-2">
				<ActionCard json={TriggerList} validate={this._validate}/>
			</div>
		);
	}
}
export default Step2;