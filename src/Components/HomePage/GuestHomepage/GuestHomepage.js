import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import logo from "../../Common/Images/Background.png";
import "./GuestHomepage.css";

const data = {
	details: [
		{
			heading: "A world that works for you",
			content:
				"IFTTT is the free way to get all your apps and devices talking to each other. Not everything on the internet plays nice, so we're on a mission to build a more connected world.",
			alt: "N"
		},
		{
			heading: "Post your photo anywhere and see it everywhere",
			content:
				"We help social media play nice together. Never tweet a link instead of a picture again!",
			alt: "Y"
		},
		{
			heading: "A world that works for you",
			content:
				"IFTTT is the free way to get all your apps and devices talking to each other. Not everything on the internet plays nice, so we're on a mission to build a more connected world.",
			alt: "N"
		},
		{
			heading: "Make your voice assistant more personal",
			content:
				"Just say the word, and we’ll help you stay in-sync across systems as you go through your day.",
			alt: "Y"
		}
	]
};

class GuestHomepage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const rowsList = data.details.map(contents => (
			<FeatureRow
				heading={contents.heading}
				content={contents.content}
				alt={contents.alt}
			/>
		));
		return <div className="guest-homepage">{rowsList}</div>;
	}
}

class FeatureRow extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		const alt = this.props.alt;
		const FirstContent =
			alt == "Y" ? (
				<Grid item sm={5}>
					<img src={logo} className="logo" />
				</Grid>
			) : (
				<Grid item sm={4}>
					<div className="text">
						<h1>{this.props.heading}</h1>
						<p>{this.props.content}</p>
					</div>
				</Grid>
			);
		const SecondContent =
			alt == "Y" ? (
				<Grid item sm={5}>
					<div className="text">
						<h1>{this.props.heading}</h1>
						<p>{this.props.content}</p>
					</div>
				</Grid>
			) : (
				<Grid item sm={6}>
					<img src={logo} className="logo" />
				</Grid>
			);
		return (
			<div className="feature-row">
				<Grid container spacing={24}>
					{FirstContent}

					<Grid item sm={2} />

					{SecondContent}
				</Grid>
			</div>
		);
	}
}

export default GuestHomepage;
