import React from 'react';
import './LandingComponent.css';
import logo from '../../../assets/Logo/logo.png';

function LandingComponent({ onGetStartedClick }) {
  return (
    <div className="landing-container">
      <img src={logo} alt="Logo" className="landing-logo" />
      <h1 className="landing-heading">aRTEMIS AI</h1>
      <p className="landing-paragraph">
        Welcome to Artimis, We provide 4 domain AIs for you to work with, which includes: Dev-GuildAI, Creative-GuildAI, Busi-GuildAI, and Tutor-GuildAI for Professionals, Intermediate, or Starters. Our platform creates your bondage with your field so tight that you will never lose your grip on your goals.
      </p>
      <button className="get-started-button" onClick={onGetStartedClick}>
        Get Started!
      </button>
    </div>
  );
}

export default LandingComponent;
