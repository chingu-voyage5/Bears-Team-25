import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom'
import Homepage from "../Homepage/Homepage";
import CreateApplet from "../CreateApplet/CreateApplet";
import MyApplet from "../MyApplet/MyApplet";
import Footer from "../Footer/Footer";
import Activity from "../Activity/Activity";
import "./App.css";

class App extends Component {
	render() {
		return (
			<div className="App">
				<Switch>
					<Route exact path="/" component={Homepage} />
					<Route path="/createapplet" component={CreateApplet} />
					<Route path="/myapplets" component={MyApplet} />
					<Route path="/activity" component={Activity} />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default App;
