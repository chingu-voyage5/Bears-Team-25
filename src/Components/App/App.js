import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom'
import Homepage from "../HomePage/Homepage";
import CreateApplet from "../CreateApplet/CreateApplet";
import MyApplet from "../MyApplet/MyApplet";
import "./App.css";

class App extends Component {
	render() {
		return (
			<div className="App">
				<Switch>
					<Route exact path="/" component={Homepage} />
					<Route path="/createapplet" component={CreateApplet} />
					<Route path="/myapplets" component={MyApplet} />
				</Switch>
			</div>
		);
	}
}

export default App;
