import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { delete_account } from "../../actions/accountDeletionActions";
import { Redirect } from "react-router";
import {
  renderTextField,
  validateOnlyPass
} from "../../commonFunctions/formFunctions";
import ConfirmationDialog from '../Common/ConfirmationDialog/confirmationDialog';
import { formValueSelector } from 'redux-form';
const selector = formValueSelector('AccountDeletionForm')

class AccountDeletionPage extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let name = localStorage.getItem("name");
    if (!name) {
      return <Redirect to="/" />;
    }
    const {valid, isFetching, dispatch, password } = this.props;
    const values = {password}
    return (
      <div className="screen-center deletion">
          <h1 className="form-title"> Delete account</h1>
          <div style={{ marginBottom: "0.6em", marginTop: "0.6em" }}>
            <Field
              fullWidth
              className="input-field"
              name="password"
              type="password"
              label="Enter your password to continue"
              component={renderTextField}
            />
          </div>
          <div className="bottom-link-container">
            <Button
              variant="raised"
              color="secondary"
              className="submit-button"
              disabled={isFetching || !valid}
              onClick = { this.handleClickOpen}
            >
              {" "}
              Delete
            </Button>
            <Link className="bottom-link" to="/settings">
              I changed my mind
            </Link>
          </div>
        <ConfirmationDialog
          open={this.state.open}
          handleClose={this.handleClose}
          message="This action will delete your account."
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          action = {() => dispatch(delete_account(values))}
        /> 
      </div>
    );
  }
}

AccountDeletionPage = reduxForm({
  form: "AccountDeletionForm", // a unique identifier for this form
  validate: validateOnlyPass
})(AccountDeletionPage);

function mapStateToProps(state) {
  return {
    isFetching: state.accountDeletion.isFetching,
    password: selector(state, 'password'),
  };
}

export default (AccountDeletionPage = connect(mapStateToProps)(
  AccountDeletionPage
));
