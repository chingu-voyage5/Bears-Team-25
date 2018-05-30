import React,{Component} from "react";
import Grid from "@material-ui/core/Grid";

class Step1 extends Component{
	render(){
		return(
			<div className="step">
				<Grid container spacing={24}>
					<Grid item sm={12}>
					<div className="text-center">
						<h2>Choose a service</h2>
					</div>
					</Grid>
					<Grid item sm={12}>
					<div className="text-center">
						<p>Step 1 of 6</p>
					</div>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default Step1;