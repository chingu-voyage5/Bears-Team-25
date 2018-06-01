import React, { Component } from "react";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
import Step3 from "./Step3/Step3";
import Step4 from "./Step4/Step4";
import Step5 from "./Step5/Step5";
import Step6 from "./Step6/Step6";

class CreateApplet extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStep: 1
		};
		this._next=this._next.bind(this);
	}
	_next(data) {
		let currentStep = this.state.currentStep;
		if (currentStep >= 6) {
			currentStep = 1;
		} else {
			currentStep = currentStep + 1;
		}
		console.log("Clicked1");
		this.setState({
			currentStep: currentStep
		});
	}
	render() {
		let currentStep = this.state.currentStep;
		return (
			<div className="create-applet">
				<div className="text-center">
					<h1>Choose a service</h1>
				</div>
				<div className="text-center">
					<p>Step {this.state.currentStep} of 6</p>
				</div>
				<Step1 currentStep={currentStep} afterValid={this._next}/>
				<Step2 currentStep={currentStep} afterValid={this._next}/>
				<Step3 currentStep={currentStep} afterValid={this._next}/>
				<Step4 currentStep={currentStep} afterValid={this._next}/>
				<Step5 currentStep={currentStep} afterValid={this._next}/>
				<Step6 currentStep={currentStep} afterValid={this._next}/>
			</div>
		);
	}
}

export default CreateApplet;


