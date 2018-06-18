import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { renderSocialSuccess } from "../../../actions/snackbarActions";

class SuccessWithSocial extends Component {
  renderSnackbar = () => {
    const { renderSocialSuccess } = this.props;
    const { message } = this.props.match.params;
    renderSocialSuccess(message);
  };

  componentWillMount() {
    this.renderSnackbar();
  }

  render() {
    return <Redirect to="/settings" />;
  }
}

export default connect(
  null,
  { renderSocialSuccess }
)(SuccessWithSocial);
