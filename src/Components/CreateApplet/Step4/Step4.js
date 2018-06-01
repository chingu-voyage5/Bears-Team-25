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
		if (this.props.currentStep !== 4) {
			return null;
		}
		return(
			<div className="step-2">
				<ActionCard json={TriggerList} />
			</div>
		);
	}
}
export default Step4;