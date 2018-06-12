import React,{Component} from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import './AppletCard.css';

class AppletCard extends Component {
	state = {
		checkedA: true,
		checkedB: true
	};

	handleChange = name => event => {
		this.setState({ [name]: event.target.checked });
	};
	render() {
		return (
			<Grid item sm={4}>
				<div className="applet-card">
					<Card className="card">
						<CardContent className="white-text">
							<ServiceLogo />
							<TextArea content={this.props.content} />
						</CardContent>
						<CardContent className="card-footer">
							<Grid container spacing={24}>
								<Grid item sm={7}>
									<span className="left-align">
										Running:<Switch
											checked={this.state.checkedB}
											onChange={this.handleChange(
												"checkedB"
											)}
											value="checkedB"
											color="primary"
										/>
									</span>
								</Grid>
								<Grid item sm={5}>
									<span className="right-align">
										<span className="inline">
											<span className="text-inline">
												Works with
											</span>{" "}
											<AssignmentIcon className="icon" />
										</span>
									</span>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</div>
			</Grid>
		);
	}
}

class TextArea extends Component {
	render() {
		return (
			<div className="text-area" defaultValue={this.props.content}>
			{/* <textarea>{this.props.content}</textarea> */}
			</div>
		);
	}
}

class ServiceLogo extends Component {
	render() {
		return (
			<div className="review-card">
				<Avatar>
					<AssignmentIcon />
				</Avatar>
			</div>
		);
	}
}

export default AppletCard;