import React, { Component } from "react";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
import Step3 from "./Step3/Step3";
import Step4 from "./Step4/Step4";
import Step5 from "./Step5/Step5";
import Step6 from "./Step6/Step6";
import * as createActions from "../../actions/createActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//Main page in which create-applet happens
class CreateApplet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1
    };
    this._changeStep = this._changeStep.bind(this);
    this._next = this._next.bind(this);
    this._doubleNext = this._doubleNext.bind(this);
    this._setAction = this._setAction.bind(this);
    this._finish = this._finish.bind(this);
    this.modifyData = this.modifyData.bind(this);
  }

  //function describing what should happen when going to next page
  _changeStep() {
    let currentStep = this.state.currentStep;
    if (currentStep >= 6) {
      currentStep = 1;
    } else {
      currentStep = currentStep + 1;
    }
    this.setState({
      currentStep: currentStep
    });
  }

  _next(key, value) {
    this._changeStep();
    this.setState({
      [key]: value
    });
  }

  _doubleNext(key1, value1, key2, value2, values = {}) {
    this._changeStep();
    this.setState({
      [key1]: value1,
      [key2]: value2,
      ...values
    });
  }

  _setAction(obj) {
    this._changeStep();
    if (obj.field) {
      this.setState({
        heading: obj.field[0].heading,
        content: obj.field[0].content
      });
    } else if (this.state.serviceTo === "Trello") {
      this.setState({ trelloOptions: obj });
    } else if (this.state.serviceTo === "Slack") {
      this.setState({ slackOptions: obj });
    } else if (this.state.serviceTo === "Mail") {
      this.setState({ mailOptions: obj });
    }
  }

  modifyData(obj) {
    let appletData = {
      action: {
        id: 4,
        heading: obj.actionHeading,
        content: obj.actionContent,
        trelloOptions: obj.trelloOptions,
        slackOptions: obj.slackOptions,
        mailOptions: obj.mailOptions
      },
      trigger: {
        id: 4,
        heading: obj.triggerHeading,
        content: obj.triggerContent,
        twitterOptions: obj.twitterOptions
      },
      option: {
        watchFrom: obj.serviceFrom,
        watchTo: obj.serviceTo,
        watchFor: "None"
      },
      // content: obj.content,
      content: "If " + obj.triggerHeading + " then " + obj.actionHeading,
      heading: obj.heading
    };
    return appletData;
  }

  _finish(obj) {
    let appletData = this.modifyData(this.state);
    this.props.createActions.addApplet(appletData);
    this.setState({
      currentStep: 1,
      trelloOptions: undefined,
      slackOptions: undefined,
      twitterOptions: undefined
    });
  }

  render() {
    let currentStep = this.state.currentStep; //current step in create-applet
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
        <Step1 currentStep={currentStep} afterValid={this._next} step="1" />
        <Step2
          currentStep={currentStep}
          service={this.state.serviceFrom}
          afterValid={this._doubleNext}
          step="2"
        />
        <Step3 currentStep={currentStep} afterValid={this._next} step="3" />
        <Step4
          currentStep={currentStep}
          service={this.state.serviceTo}
          afterValid={this._doubleNext}
          step="4"
          serviceFrom={this.state.serviceFrom}
        />
        <Step5
          currentStep={currentStep}
          afterValid={this._setAction}
          serviceTo={this.state.serviceTo}
        />
        <Step6
          currentStep={currentStep}
          data={this.state}
          afterValid={this._finish}
        />
      </div>
    );
  }
}

const mapActionsToProps = dispatch => {
  return {
    createActions: bindActionCreators(createActions, dispatch)
  };
};

export default connect(
  null,
  mapActionsToProps
)(CreateApplet);
