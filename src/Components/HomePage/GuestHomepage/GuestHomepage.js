import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
// import logo from "../../Common/Images/Background.png";
import video from "../../../Videos/How_IFTTT_Works.mp4";
import "./GuestHomepage.css";

const data = {
	details: [
		{
			heading: "Post your photo anywhere and see it everywhere",
			content:
				"We help social media play nice together. Never tweet a link instead of a picture again!",
			alt: "Y",
			img:require('../../Common/Images/Background.png')
		},
		{
			heading: "A world that works for you",
			content:
				"IFTTT is the free way to get all your apps and devices talking to each other. Not everything on the internet plays nice, so we're on a mission to build a more connected world.",
			alt: "N",
			img:require('../../Common/Images/Background.png')
		},
		{
			heading: "Make your voice assistant more personal",
			content:
				"Just say the word, and we’ll help you stay in-sync across systems as you go through your day.",
			alt: "Y",
			img:require('../../Common/Images/Background.png')
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
				img={contents.img}
			/>
		));
		return (
			<div className="guest-homepage">
				<FeatureRow
					heading={data.details[0].heading}
					content={data.details[0].content}
					img={data.details[0].img}
				/>
				<VideoRow />
				<TryItOutRow />
				{rowsList}
			</div>
		);
	}
}

class VideoRow extends Component {
	render() {
		return (
			<video width="320" height="200">
				<source src={video} type="video/mp4" />
			</video>
		);
	}
}

class TryItOutRow extends Component {
	render() {
		const heading =
			"IFTTT helps your apps and devices work together in new ways";
		const content =
			"We’ll show you some of our favorite pairings. Just turn on what you like and we’ll make it happen for you.";
		return (
			<div className="try-out-row feature-row text">
				<Grid container spacing={24}>
					<Grid item sm={12}>
						<div className="text-center">
							<h1>{heading}</h1>
						</div>
					</Grid>
					<Grid item sm={5} className="text">
						<p>{content}</p>
					</Grid>
					<Grid item sm={4} />
					<Grid item sm={3}>
						<Button variant="outlined" className="try-it-button">
							Try it out today
						</Button>
					</Grid>
				</Grid>
			</div>
		);
	}
}

class FeatureRow extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	// <img src={logo} className="logo" />
	render() {
		const alt = this.props.alt;
		const logo=this.props.img;

		const FirstContent =
			alt == "Y" ? (
				<Grid item sm={5} >
					<img src={logo} className="logo" />
				</Grid>
			) : (
				<Grid item sm={4}>
					<div className="text">
						<h1>{this.props.heading}</h1>
						<p>{this.props.content}</p>
						<Button
							variant="raised"
							color="primary"
							size="large"
							className="add-btn submit-btn"
						>
							Try it out
						</Button>
					</div>
				</Grid>
			);

		const SecondContent =
			alt == "Y" ? (
				<Grid item sm={5}>
					<div className="text">
						<h1>{this.props.heading}</h1>
						<p>{this.props.content}</p>
						<Button
							variant="raised"
							color="primary"
							size="large"
							className="add-btn submit-btn"
						>
							Try it out
						</Button>
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
