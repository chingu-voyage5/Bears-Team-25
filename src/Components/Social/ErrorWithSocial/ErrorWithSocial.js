import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { renderSocialError } from "../../../actions/snackbarActions";

class ErrorWithSocial extends Component {
  renderSnackbar = () => {
    const { renderSocialError } = this.props;
    const { message } = this.props.match.params;
    renderSocialError(message);
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
  { renderSocialError }
)(ErrorWithSocial);
