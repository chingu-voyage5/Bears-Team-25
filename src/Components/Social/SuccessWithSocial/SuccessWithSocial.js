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
    const { message } = this.props.match.params;
    if (message[0] === 'Y') return <Redirect to="/settings" />;
    return <Redirect to="/services" />
  }
}

export default connect(
  null,
  { renderSocialSuccess }
)(SuccessWithSocial);
