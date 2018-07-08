//Renders the step 2 for create-applet

import React, { Component } from "react";
import { connect } from "react-redux";
import ActionCard from "../ActionCard/ActionCard";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true, values:{ twitterOptions: {hashtag:''} } };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkData = this.checkData.bind(this);
  }

  handleChange(event) {
    var state = this.state;
    state.values.twitterOptions.hashtag = event.target.value;
    this.setState(state);
  }

  handleSubmit(event) {
    const {json ,values} = this.state;
    event.preventDefault();
    this.props.afterValid(json.key1, json.value1, json.key2, json.value2, values);
  }

  checkData(key1, value1, key2, value2) {
    if (value1 === "New tweet by you with hashtag") {
      this.setState({ open: false, json: {key1, value1, key2, value2} });
    } 
    else if (value1 === "New tweet by you") {
      this.props.afterValid(key1, value1, key2, value2, {twitterOptions: {byAnyTweet: true}});
    }
    else if (value1 === "New follower") {
      this.props.afterValid(key1, value1, key2, value2, {twitterOptions: {byNewFollower: true}});
    }
    else {
      this.props.afterValid(key1, value1, key2, value2);
      
    }
  }

  render() {
    const { open, values } = this.state;
    // console.log(values)
    const service = this.props.service;
    const TriggerList = this.props.TriggerList[service];
    if (TriggerList === undefined) {
      return null;
    }
    if (this.props.currentStep !== 2) {
      return null;
    }
    return (
      <div className="step-2">
        {open && (
          <ActionCard json={TriggerList} validate={this.checkData} step="2" />
        )}
        {!open && (
          <form style={{textAlign:'center'}}onSubmit={this.handleSubmit}>
            <div>
			  <TextField 
			  	className='input-field'
                required
                id="required"
                label="Hashtag"
                margin="normal"
                value={values.twitterOptions.hashtag}
                onChange={this.handleChange}
              />
            </div>
            <Button
              variant="raised"
              color="primary"
              disabled={!values.twitterOptions.hashtag}
              type="submit"
            >
              Create trigger
            </Button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    TriggerList: state.trigger
  };
};

export default connect(mapStateToProps)(Step2);
