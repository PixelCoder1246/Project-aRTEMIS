import React from 'react';
import './AboutPage.css'; 
import { FaEye, FaBullseye } from 'react-icons/fa'; 

function AboutPage() {
  return (
    <div className="about-us-page">
      <section className="about-us-top-section">
        <h1>About Us</h1>
        <p>
          We are a forward-thinking company committed to excellence and innovation in everything we do.
          Our mission is to provide top-quality services while maintaining the highest standards of integrity and professionalism.
        </p>
      </section>

      <section className="about-us-cards-section">
        <div className="about-us-card vision-card">
          <div className="about-us-card-header">
            <FaEye className="about-us-icon-vision" />
            <h2>Our Vision</h2>
          </div>
          <p>
            Our vision is to lead in our industry by constantly evolving, innovating, and delivering the best value to our customers.
          </p>
        </div>
        <div className="about-us-card goals-card">
          <div className="about-us-card-header">
            <FaBullseye className="about-us-icon-goals" />
            <h2>Our Goals</h2>
          </div>
          <ol>
            <li><i className="fa fa-check-circle"></i> Provide excellent customer service</li>
            <li><i className="fa fa-check-circle"></i> Foster innovation within our team</li>
            <li><i className="fa fa-check-circle"></i> Expand globally while maintaining quality</li>
            <li><i className="fa fa-check-circle"></i> Ensure sustainability in all our practices</li>
          </ol>
        </div>
      </section>

      <section className="about-us-more-info">
        <h2>More About Us</h2>
        <p>
          We are passionate about achieving our goals and aligning our team to push boundaries. Our dedication to
          innovation and excellence is what drives us to constantly improve.
        </p>
      </section>
    </div>
  );
}

export default AboutPage;
