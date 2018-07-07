import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "./profileSettingsPage.css";
import { change_email, unlink } from "../../actions/profileSettingsActions";
import { Redirect } from "react-router";
import {
  renderTextField,
  validatePassAndEmail
} from "../../commonFunctions/formFunctions";


class ProfileSettingsPage extends React.Component {

  unlinkFb = () => {
    const { unlink } = this.props;
    unlink('facebook');
  }
  unlinkGoogle = () => {
    const { unlink } = this.props;
    unlink('google');
  }
  render() {
    const {  
      handleSubmit,
      isFBLinked,
      isGoogleLinked,
      valid,
      isFetching,
      dispatch
    } = this.props;
    let name = localStorage.getItem('name')
    if (!name) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="screen-center settings" style={{ textAlign: "start" }}>
          <form onSubmit={values => dispatch(handleSubmit(values))}>
            <div>
              <h2 className="form-title"> Account</h2>
              <h4 style={{ marginBottom: 0, marginTop: "0.6em" }}> Email</h4>
              <Field
                fullWidth
                className="input-field"
                name="email"
                component={renderTextField}
              />
            </div>
            <div style={{ marginBottom: "0.6em" }}>
              <h4 className="form-title"> Password</h4>
              <Field
                fullWidth
                className="input-field"
                name="password"
                type="password"
                disabled={true}
                component={renderTextField}
              />
              <Link className="title-link" to="/change_password">
                Change password
              </Link>
            </div>
            <h3 className="form-title"> Linked accounts</h3>
            <div className="social-link-container">
              <img
                className="link-acc-image"
                title="Google account is linked"
                alt="Google account is linked"
                src="//web-assets.ifttt.com/assets/web/social-signon/google-21c9ddc5a9057bbbeadee3865e7b7fe40483807a0e1c6dda34eae0dd683be1d0.svg"
              />

              {isGoogleLinked && <span className='social-status-container'>
              <span className="social-link-status-wrapper">Google account is linked</span>
              <span onClick={this.unlinkGoogle} className="social-link">Unlink</span>
              </span>}

              {!isGoogleLinked && <span className='social-status-container'>
               <span className="social-link-status-wrapper">Google account is not linked</span>
              <a href="http://localhost:3001/api/users/auth/google"  className="social-link">Link</a>
              </span>}

            </div>
            <div className="social-link-container">
              <img
                className="link-acc-image"
                title="Facebook is not linked"
                alt="Facebook is not linked"
                src="//web-assets.ifttt.com/assets/web/social-signon/facebook-d8dad9fdd6856071e5e5cd323995a9cbb5c7380aabde8898845b769a998c9846.svg"
              />
             {isFBLinked && <span className='social-status-container'>
              <span className="social-link-status-wrapper">Facebook account is linked</span>
              <span onClick={this.unlinkFb} className="social-link">Unlink</span>
              </span>}

              {!isFBLinked && <span className='social-status-container'>
               <span className="social-link-status-wrapper">Facebook account is not linked</span>
              <a href="http://localhost:3001/api/users/auth/facebook"  className="social-link">Link</a>
              </span>}
            </div>

            <div className="bottom-link-container">
              <Button
                variant="raised"
                color="primary"
                className="submit-button"
                type="submit"
                disabled={isFetching || !valid}
              >
                {" "}
                Update
              </Button>
              <Link className="bottom-link" to="/account_deletion">
                Delete your account
              </Link>
            </div>
          </form>
        </div>
      );
    }
  }
}

ProfileSettingsPage = reduxForm({
  form: "profileSettingsForm", // a unique identifier for this form
  validate: validatePassAndEmail
})(ProfileSettingsPage);

function mapStateToProps(state) {
  return {
    isFBLinked: state.auth.isFBLinked,
    isGoogleLinked: state.auth.isGoogleLinked,
    initialValues: { email: state.auth.email, password: "password" },
    auth: state.auth.auth,
    onSubmit: values => change_email(values),
    isFetching: state.auth.profileSettings.isFetching
  };
}

export default (ProfileSettingsPage = connect(
  mapStateToProps,
  { unlink}
)(ProfileSettingsPage));
