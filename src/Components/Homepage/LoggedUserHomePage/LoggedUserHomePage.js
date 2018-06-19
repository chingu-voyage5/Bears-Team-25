import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import AppletCard from "../../Common/AppletCard/AppletCard";
import { connect } from "react-redux";
import * as listAppletAction from "../../../actions/listAppletAction";
import { bindActionCreators } from "redux";
import "./LoggedUserHomePage.css";
import Button from "@material-ui/core/Button";
const axios = require("axios");

class LoggedUserHomePage extends Component {
  componentWillMount() {
    this.props.listActions.listApplets();
  }
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
    const appletList = this.props.allAppletList;
    const AppletList = appletList.map((applet, i) => (
      <AppletCard key={`appletCard-${i}`} content={applet.content} />
    ));
    return (
      <div className="logged-home-page">
        <div className="text-center">
          <h1>Recommended for you</h1>
        </div>
        <Grid container spacing={24}>
          {AppletList}
        </Grid>

        <Button onClick={this.sendMessage} variant="raised" color="primary">
          send message
        </Button>
        <a href="http://localhost:3001/api/slack/auth/">
          <Button variant="raised" >Slack
          </Button>
        </a>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allAppletList: state.applet.appletList
  };
};

const mapActionsToProps = dispatch => {
  return {
    listActions: bindActionCreators(listAppletAction, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LoggedUserHomePage);
