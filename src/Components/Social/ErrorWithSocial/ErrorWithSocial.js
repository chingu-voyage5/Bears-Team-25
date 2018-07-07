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
    const { message } = this.props.match.params;
    if (message[0] === 'T') return <Redirect to="/settings" />;
    return <Redirect to="/services" />;
  }
}

export default connect(
  null,
  { renderSocialError }
)(ErrorWithSocial);
