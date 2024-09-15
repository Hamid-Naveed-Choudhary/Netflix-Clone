import React from "react";
import "./Footer.css";
import youtube_icon from "../../assets/youtube_icon.png";
import twitter_icon from "../../assets/twitter_icon.png";
import instagram_icon from "../../assets/instagram_icon.png";
import facebook_icon from "../../assets/facebook_icon.png";

const Footer = () => {
  const socialIcons = [
    { src: facebook_icon, alt: "Facebook" },
    { src: instagram_icon, alt: "Instagram" },
    { src: twitter_icon, alt: "Twitter" },
    { src: youtube_icon, alt: "YouTube" }
  ];

  return (
    <div className='footer'>
      <div className='footer-icons'>
        {socialIcons.map((icon, index) => (
          <img
            key={index}
            src={icon.src}
            alt={icon.alt}
            className='social-icon'
          />
        ))}
      </div>
      <ul className='footer-links'>
        <li><a href="#">Audio Description</a></li>
        <li><a href="#">Help Centre</a></li>
        <li><a href="#">Gift Cards</a></li>
        <li><a href="#">Media Centre</a></li>
        <li><a href="#">Investor Relations</a></li>
        <li><a href="#">Jobs</a></li>
        <li><a href="#">Terms of Use</a></li>
        <li><a href="#">Privacy</a></li>
        <li><a href="#">Legal Notices</a></li>
        <li><a href="#">Cookie Preferences</a></li>
        <li><a href="#">Corporate Information</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
      <p className="copyright-text">© 1997-2023 Netflix, Inc.</p>
    </div>
  );
};

export default Footer;
