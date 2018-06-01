import React,{Component} from "react";

class MyApplet extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}
	render() {
		return (
			<div className="my-applet">
				<h1>Applets shown here</h1>
			</div>
		);
	}
}

export default MyApplet;