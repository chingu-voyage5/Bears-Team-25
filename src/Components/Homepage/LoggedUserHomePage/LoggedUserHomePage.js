import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import AppletCard from "../../Common/AppletCard/AppletCard";
import { connect } from "react-redux";
import * as listAppletAction from "../../../actions/listAppletAction";
import { bindActionCreators } from "redux";
import "./LoggedUserHomePage.css";
import Slack from '../../Slack/slackComponent';

class LoggedUserHomePage extends Component {
  componentWillMount() {
    this.props.listActions.listApplets();
  }
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
        <Slack />
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
