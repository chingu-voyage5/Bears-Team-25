/**
 * This component have two columns.
 * First column just show company logo
 * Rest all columns (.footer_links) contain all kind of links which have been seperated into another 4 columns.
 **/
import React, { Component } from "react";
// import logo from "../Common/Images/ifttt-banner.png";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer-overlay">
        <div className="footer">
          {/* <div className="footer__logo1">
              <img src={logo} alt="Project Showcase" />
          </div> */}
          <div className="footer__links">
            <div className="footer__links__column">
              <div>CONNECT</div>
              <ul>
                <li>Help</li>
                <li>Facebook</li>
                <li>Github</li>
                <li>Medium</li>
              </ul>
            </div>
            <div className="footer__links__column">
              <div>GENERAL</div>
              <ul>
                <li>About</li>
                <li>Blogs</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div className="footer__links__column">
              <div>SPECIALTY PAGES</div>
              <ul>
                <li>Most Viewed</li>
                <li>High Rated</li>
                <li>Recommended Applets</li>
                <li>New Additions</li>
              </ul>
            </div>
            <div className="footer__links__column" style={{marginRight: 0}}>
              <div>ACCOUNTS</div>
              <ul>
                <li>My Account</li>
                <li>Community</li>
                <li>Github</li>
                <li>Feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
