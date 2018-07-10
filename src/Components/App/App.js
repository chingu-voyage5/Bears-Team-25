import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom'
import Homepage from "../HomePage/Homepage";
import CreateApplet from "../CreateApplet/CreateApplet";
import MyApplet from "../MyApplet/MyApplet";
import Footer from "../Footer/Footer";
import Activity from "../Activity/Activity";
import Header from '../Header/header';
import SignInPage from '../SignInPage/signInPage';
import Snackbar from '../Snackbar/snackbar';
import SignInUsingPasswordPage from '../SignInWithPasswordPage/signInUsingPasswordPage';
import SignUpPage from '../SignUpPage/signUpPage';
import ChangePasswordPage from '../ChangePasswordPage/changePasswordPage';
import ProfileSettingsPage from '../ProfileSettingsPage/profileSettingsPage';
import AccountDeletionPage from '../AccountDeletionPage/accountDeletionPage'
import ErrorWithSocial from '../Social/ErrorWithSocial/ErrorWithSocial';
import SuccessWithSocial from '../Social/SuccessWithSocial/SuccessWithSocial';
import ButtonApplet from "../ButtonApplet/ButtonApplet";
import Services from "../Services/Services";
import "./App.css";

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header />
				<div className='main-content'>
				<Switch >
					<Route exact path="/" component={Homepage} />
					<Route path='/login' component={SignInPage} />
					<Route path='/sign_in' component={SignInUsingPasswordPage} />
					<Route path='/join' component={SignUpPage} />
					<Route path='/settings' component={ProfileSettingsPage} />
					<Route path='/change_password' component={ChangePasswordPage} />
					<Route path='/account_deletion' component={AccountDeletionPage} />
					<Route path="/createapplet" component={CreateApplet} />
					<Route path="/myapplets" component={MyApplet} />
					<Route path="/activity" component={Activity} />
					<Route path="/error/:message" component={ErrorWithSocial} />
					<Route path="/success/:message" component={SuccessWithSocial} />
					<Route path="/button_applet" component={ButtonApplet} />
					<Route path="/services" component={Services} />
				</Switch>
				</ div>
				<Footer />
				<Snackbar />
			</div>
		);
	}
}

export default App;
