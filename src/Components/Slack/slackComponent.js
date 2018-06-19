import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
const axios = require("axios");

class Slack extends Component {
  sendMessage = () => {
    axios
      .get("http://localhost:3001/api/slack/sendMessage", {
        withCredentials: true
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    const { isSlackToken } = this.props;
    return (
      <div>
        <Button onClick={this.sendMessage} variant="raised" color="primary">
          send message
        </Button>
        {!isSlackToken && (
          <a href="http://localhost:3001/api/slack/auth/">
            <Button variant="raised">Slack</Button>
          </a>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSlackToken: state.auth.isSlackToken
  };
};


export default connect(
  mapStateToProps
)(Slack);
