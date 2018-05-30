import React, { Component } from "react";
// import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
// import Step3 from "./Step3/Step3";

class CreateApplet extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStep: 0
		};
	}
	_next(data) {
		let currentStep = this.state.currentStep;
		if (currentStep >= 6) {
			currentStep = 6;
		} else {
			currentStep = currentStep + 1;
		}

		this.setState({
			currentStep: currentStep
		});
	}
	render() {
		let currentStep = this.state.currentStep;
		return (
			<div className="create-applet">
				<Step2 currentStep={currentStep} />
			</div>
		);
	}
}

export default CreateApplet;
