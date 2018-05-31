import React,{Component} from "react";
import ActionCard from "../ActionCard/ActionCard";

class Step4 extends Component{
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
		return(
			<div className="step-2">
				<div className="text-center">
					<h1>Choose an action</h1>
				</div>
				<div className="text-center">
					<p>Step 4 of 6</p>
				</div>
				<ActionCard json={TriggerList} />
			</div>
		);
	}
}
export default Step4;