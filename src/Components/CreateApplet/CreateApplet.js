import React, { Component } from "react";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
import Step3 from "./Step3/Step3";
import Step4 from "./Step4/Step4";
import Step5 from "./Step5/Step5";
import Step6 from "./Step6/Step6";

//Main page in which create-applet happens
class CreateApplet extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStep: 1
		};
		this._next=this._next.bind(this);
	}

	//function describing what should happen when going to next page
	_next(key,value) {
		let currentStep = this.state.currentStep;
		if (currentStep >= 6) {
			currentStep = 1;
		} else {
			currentStep = currentStep + 1;
		}
		console.log("Clicked1");
		console.log(key+" "+value);
		this.setState({
			currentStep: currentStep,
			[key]:value
		},()=>{
			console.log(this.state);
		});
	}
	render() {
		let currentStep = this.state.currentStep;//current step in create-applet

		//returns the step which is the currentstep
		//each step component, example, step1 checks if the current step matches with it, like here if current step is 1 then only step1 should be be returned or shown, and all else return null
		return (
			<div className="create-applet">
				<div className="text-center">
					<h1>Choose a service</h1>
				</div>
				<div className="text-center">
					<p>Step {this.state.currentStep} of 6</p>
				</div>
				<Step1 currentStep={currentStep} afterValid={this._next} step="1"/>
				<Step2 currentStep={currentStep} afterValid={this._next} step="2"/>
				<Step3 currentStep={currentStep} afterValid={this._next} step="3"/>
				<Step4 currentStep={currentStep} afterValid={this._next} step="4"/>
				<Step5 currentStep={currentStep} afterValid={this._next}/>
				<Step6 currentStep={currentStep} afterValid={this._next}/>
			</div>
		);
	}
}

export default CreateApplet;


