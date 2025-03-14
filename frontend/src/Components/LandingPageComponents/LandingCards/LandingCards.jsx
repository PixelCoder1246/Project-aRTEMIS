import React from 'react';
import './LandingCards.css'; 
import { FaRocket, FaBrain, FaShieldAlt, FaChartLine } from 'react-icons/fa'; 

function LandingCards() {
  return (
    <div className="cards-container">
      <div className="card">
        <div className="card-header">
          <FaRocket className="card-icon" />
          <h3>Speed and Efficiency</h3>
        </div>
        <p>Our AI delivers lightning-fast results, optimizing workflows and boosting productivity with minimal latency.</p>
      </div>
      <div className="card">
        <div className="card-header">
          <FaBrain className="card-icon" />
          <h3>Intelligent Learning</h3>
        </div>
        <p>With advanced learning algorithms, our AI adapts and evolves, providing smarter solutions over time.</p>
      </div>
      <div className="card">
        <div className="card-header">
          <FaShieldAlt className="card-icon" />
          <h3>Security and Trust</h3>
        </div>
        <p>We prioritize security, ensuring that your data remains protected and handled with the utmost trust and integrity.</p>
      </div>
      <div className="card">
        <div className="card-header">
          <FaChartLine className="card-icon" />
          <h3>Data Insights</h3>
        </div>
        <p>Our AI analyzes and provides actionable insights from data, helping businesses make better decisions faster.</p>
      </div>
    </div>
  );
}

export default LandingCards;
