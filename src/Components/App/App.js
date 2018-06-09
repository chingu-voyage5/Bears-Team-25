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
import "./App.css";

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header />
				<Switch>
					<Route exact path="/" component={Homepage} />
					<Route path='/login' component={SignInPage} />
					<Route path='/sign_in' component={SignInUsingPasswordPage} />
					<Route path="/createapplet" component={CreateApplet} />
					<Route path="/myapplets" component={MyApplet} />
					<Route path="/activity" component={Activity} />
				</Switch>
				{/* <Footer />  deleted until styling fixed*/}
				<Snackbar />
			</div>
		);
	}
}

export default App;
