import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom'
import Homepage from "../Homepage/Homepage";
import CreateApplet from "../CreateApplet/CreateApplet";
import "./App.css";

class App extends Component {
	render() {
		return (
			<div className="App">
				<Switch>
					<Route exact path="/" component={Homepage} />
					<Route path="/createapplet" component={CreateApplet} />
				</Switch>
			</div>
		);
	}
}

export default App;
