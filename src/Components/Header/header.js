import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Visibility from "@material-ui/icons/Visibility";
import Search from "@material-ui/icons/Search";
import Apps from "@material-ui/icons/Apps";
import Subject from "@material-ui/icons/Subject";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import "./header.css";
import { withRouter } from "react-router-dom";
import { logout, fetchUsersCredentials } from "../../actions/loginActions";

class NavLinkContainer extends React.Component {
  render() {
    const { icon, title, to } = this.props;
    return (
      <NavLink
        className="navLink"
        exact={to === "/" ? true : false}
        activeStyle={{ fontWeight: "bold", opacity: 0.5 }}
        to={to}
      >
        {icon}
        <Hidden only="xs">
          <span className="button-text">{title}</span>
        </Hidden>
      </NavLink>
    );
  }
}

class Header extends React.Component {
  componentDidMount() {
    const { fetchUsersCredentials } = this.props;
    fetchUsersCredentials();
  }
  state = {
    anchorEl: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    const { logout } = this.props;
    this.setState({ anchorEl: null }, logout);
  };

  render() {
    const { auth, name } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className="header-container">
        <AppBar position="static" color={auth ? "primary" : "default"}>
          <Toolbar>
            <Link className="ifttt-logo" to="/">
              <svg
                fill={auth ? "white" : "#262326"}
                height="1.7em"
                viewBox="0 0 332 88"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Home</title>
                <path d={IFTTT_ICON} />
              </svg>
            </Link>
            {auth && (
              <i>
                <NavLinkContainer
                  to="/"
                  title="Discover"
                  icon={<Visibility />}
                />
                <NavLinkContainer
                  to="/search"
                  title="Search"
                  icon={<Search />}
                />
                <NavLinkContainer
                  to="/myapplets"
                  title="My Applets"
                  icon={<Apps />}
                />
                <NavLinkContainer
                  to="/activity"
                  title="Activity"
                  icon={<Subject />}
                />
              </i>
            )}

            {auth && (
              <div className="profile-icon">
                <Button
                  size="small"
                  aria-owns={open ? "menu-appbar" : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                  style={{ textTransform: "none" }}
                >
                  <AccountCircle />
                  <Hidden smDown>
                    <span className="useremail-button-text">{name}</span>
                  </Hidden>
                </Button>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <Link to="/createapplet">
                    <MenuItem onClick={this.handleClose}>New Applet</MenuItem>
                  </Link>
                  <Link to="/services">
                    <MenuItem onClick={this.handleClose}>Services</MenuItem>
                  </Link>
                  <Link to="/settings">
                    <MenuItem onClick={this.handleClose}>Settings</MenuItem>
                  </Link>
                  <MenuItem onClick={this.handleLogout}>Sign Out</MenuItem>
                </Menu>
              </div>
            )}
            {!auth && (
              <span className="auth-buttons">
                <Link to="/login">
                  <Button style={{ marginRight: 5 }}>Sign In</Button>
                </Link>
                <Link to="/login">
                  <Button variant="raised" color="primary">
                    Sign up
                  </Button>
                </Link>
              </span>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.auth,
    name: state.auth.name
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { logout, fetchUsersCredentials }
  )(Header)
);

const IFTTT_ICON =
  "M0 0h28v88H0V0zm64 88H36V0h68v28H64v8h28v28H64v24zm70.5-88H112v28h20v60h28V28h20V0h-45.5zM212 0h-24v28h20v60h28V28h20V0h-44zm76 0h-24v28h20v60h28V28h20V0h-44z";
