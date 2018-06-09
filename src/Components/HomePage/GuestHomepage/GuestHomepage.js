//Renders the guest homepage

import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import video from "../../../Videos/How_IFTTT_Works.mp4";
import "./GuestHomepage.css";

const data = {
	header: [
		{
			heading: "A world that works for you",
			content:
				"IFTTT is the free way to get all your apps and devices talking to each other. Not everything on the internet plays nice, so we're on a mission to build a more connected world.",
			alt: "N",
			img: require('../../Common/Images/world.jpg')
		}
	],
	details: [
		{
			heading: "Automatically light the way for the pizza delivery guy",
			content:
				"Build a smart home that responds to every cue—from locking your front door to welcoming the delivery guy.",
			alt: "Y",
			img: require('../../Common/Images/dominos-ifttt.jpg')
		},
		{
			heading: "Post your photo anywhere and see it everywhere",
			content:
				"We help social media play nice together. Never tweet a link instead of a picture again!",
			alt: "N",
			img: require('../../Common/Images/IFTTTLogoTiles.jpg')
		},
		{
			heading: "Make your voice assistant more personal",
			content:
				"Just say the word, and we’ll help you stay in-sync across systems as you go through your day.",
			alt: "Y",
			img: require('../../Common/Images/AssistantIFTTT.jpg')
		}
	]
};

//Main class that is to be exported
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
					heading={data.header[0].heading}
					content={data.header[0].content}
					img={data.header[0].img}
				/>
				<VideoRow />
				<TryItOutRow />
				{rowsList}
			</div>
		);
	}
}

//Row containing the video
class VideoRow extends Component {
	render() {
		return (
			<div style={{textAlign: 'center', marginBottom: 0, marginTop:0, paddingBottom: 0}}>
			<video width="70%" height="auto" playsInline autoPlay muted  loop>
				 <source src={video} type="video/mp4" />
				Your browser does not support the video tag.
		  </video>
		  </div>
		);
	}
}

//First Row containing the row above the video row
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

//renders row listing the feature of the IFTTT along with picture
class FeatureRow extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	// <img src={logo} className="logo" />
	render() {
		const alt = this.props.alt;//if yes, then image will be in first column and text in second column
		const logo = this.props.img;//logo of image for that feature row

		//list first content according to whether image or text should be in first column
		const FirstContent =
			alt === "Y" ? (
				<Grid item sm={5} >
					<img src={logo} className="logo" alt="logo"/>
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
			alt === "Y" ? (
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
					<img src={logo} className="logo" alt="logo"/>
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
