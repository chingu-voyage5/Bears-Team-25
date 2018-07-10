import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import "./signInPage.css";

class SignInPage extends React.Component {
  render() {
    const { auth, isFetching } = this.props;
    if (auth) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="screen-center social-sign">
          <h2 style={{ fontSize: "2em" }}>
            Get started with{" "}
            <svg
              fill="#262326"
              height="1em"
              viewBox="0 0 332 88"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Home</title>
              <path d={IFTTT_ICON} />
            </svg>
          </h2>
          <div>
            <a href="http://localhost:3001/api/users/auth/google">
              <Button
                fullWidth
                disabled={isFetching}
                variant="raised"
                className="social-button googleButton"
              >
                <SvgIcon style={{ fontSize: "2em" }} className="svg-icon">
                  <path fill="white" d={GOOGLE_ICON} />
                </SvgIcon>Continue with Google
              </Button>
            </a>
          </div>
          <div>
            <a
              href="http://localhost:3001/api/users/auth/facebook"
              target="_self"
            >
              <Button
                fullWidth
                disabled={isFetching}
                variant="raised"
                color="primary"
                className="social-button"
              >
                <SvgIcon style={{ fontSize: "2em" }} className="svg-icon">
                  <path fill="white" d={FB_ICON} />
                </SvgIcon>Continue with Facebook
              </Button>
            </a>
          </div>
          <p style={{ fontSize: "0.7em" }}>
            Or use your password to{" "}
            <Link className="link" to="/join">
              sign up
            </Link>{" "}
            or{" "}
            <Link className="link" to="/sign_in">
              sign in
            </Link>
          </p>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.auth,
    isFetching: state.auth.login.isFetching
  };
}

export default (SignInPage = connect(mapStateToProps)(SignInPage));

const GOOGLE_ICON =
  "M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z";
const FB_ICON =
  "M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z";
const IFTTT_ICON =
  "M0 0h28v88H0V0zm64 88H36V0h68v28H64v8h28v28H64v24zm70.5-88H112v28h20v60h28V28h20V0h-45.5zM212 0h-24v28h20v60h28V28h20V0h-44zm76 0h-24v28h20v60h28V28h20V0h-44z";
