import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import './AICards.css';
import Img1 from '../../../assets/AI-img/TutorAI.png';
import Img2 from '../../../assets/AI-img/AIbusiness.png';
import Img3 from '../../../assets/AI-img/AIdev.png';
import Img4 from '../../../assets/AI-img/AIcreative.png';
import { FaRobot, FaRegLightbulb, FaUsers, FaBriefcase } from 'react-icons/fa';
import { useAuth } from "../../../hooks/useAuth"

const AICards = forwardRef((props, ref) => {
  const { user, isAuthenticated, setUser, setIsAuthenticated } = useAuth();

  return (
    <div ref={ref} className="ai-cards-container">
      <h1 className='Heading-AI-Cards'>Our AI Guilds</h1>

      <div className="ai-card">
        <div className="ai-card-left">
          <h3 className="ai-card-heading">
            <FaRobot className="ai-card-icon" /> Dev-Guild AI
          </h3>
          <p className="ai-card-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam architecto odio recusandae cumque error obcaecati dicta aliquid modi consectetur debitis amet a fugit accusantium veniam repudiandae laboriosam excepturi blanditiis, nihil enim nulla!
          </p>
          <div className="ai-card-buttons">
            {
              isAuthenticated ?
                <>
                  <Link to="/dashboard">
                    <button className="ai-card-btn">Go to Dashboard!</button>
                  </Link>
                </> :
                <>

                  <Link to="/login">
                    <button className="ai-card-btn">Login Now!</button>
                  </Link>
                  <Link to="/register">
                    <button className="ai-card-btn">Register Now!</button>
                  </Link>
                </>
            }
          </div>
        </div>
        <div className="ai-card-right">
          <div className="ai-card-photo">
            <img src={Img3} alt="Dev-Guild" className="ai-card-image" />
          </div>
        </div>
      </div>

      <div className="ai-card ai-card-reversed">
        <div className="ai-card-left">
          <h3 className="ai-card-heading">
            <FaRegLightbulb className="ai-card-icon" /> Tut-Guild AI
          </h3>
          <p className="ai-card-description">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum placeat fugiat, ullam minima, enim non id rem natus dolorum quo sequi mollitia inventore nesciunt magni maxime atque distinctio aut temporibus illum optio!
          </p>
          <div className="ai-card-buttons">
            {
              isAuthenticated ?
                <>
                  <Link to="/dashboard">
                    <button className="ai-card-btn">Go to Dashboard!</button>
                  </Link>
                </> :
                <>

                  <Link to="/login">
                    <button className="ai-card-btn">Login Now!</button>
                  </Link>
                  <Link to="/register">
                    <button className="ai-card-btn">Register Now!</button>
                  </Link>
                </>
            }
          </div>
        </div>
        <div className="ai-card-right">
          <div className="ai-card-photo">
            <img src={Img1} alt="Tut-Guild" className="ai-card-image" />
          </div>
        </div>
      </div>

      <div className="ai-card">
        <div className="ai-card-left">
          <h3 className="ai-card-heading">
            <FaUsers className="ai-card-icon" /> Creative-Guild AI
          </h3>
          <p className="ai-card-description">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis voluptas, asperiores temporibus porro odio corporis, cumque, numquam assumenda tempore sed laboriosam quo eligendi. Nostrum accusantium fuga doloremque. Nostrum placeat voluptatibus dolores numquam hic!
          </p>
          <div className="ai-card-buttons">
            {
              isAuthenticated ?
                <>
                  <Link to="/dashboard">
                    <button className="ai-card-btn">Go to Dashboard!</button>
                  </Link>
                </> :
                <>

                  <Link to="/login">
                    <button className="ai-card-btn">Login Now!</button>
                  </Link>
                  <Link to="/register">
                    <button className="ai-card-btn">Register Now!</button>
                  </Link>
                </>
            }
          </div>
        </div>
        <div className="ai-card-right">
          <div className="ai-card-photo">
            <img src={Img4} alt="Creative-Guild" className="ai-card-image" />
          </div>
        </div>
      </div>

      <div className="ai-card ai-card-reversed">
        <div className="ai-card-left">
          <h3 className="ai-card-heading">
            <FaBriefcase className="ai-card-icon" /> Busi-Guild AI
          </h3>
          <p className="ai-card-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quas officia natus error voluptates adipisci nobis voluptatum autem odit libero excepturi qui cum reprehenderit, in consequuntur deleniti recusandae, maiores tenetur incidunt ad numquam ea ut?
          </p>
          <div className="ai-card-buttons">
            {
              isAuthenticated ?
                <>
                  <Link to="/dashboard">
                    <button className="ai-card-btn">Go to Dashboard!</button>
                  </Link>
                </> :
                <>

                  <Link to="/login">
                    <button className="ai-card-btn">Login Now!</button>
                  </Link>
                  <Link to="/register">
                    <button className="ai-card-btn">Register Now!</button>
                  </Link>
                </>
            }
          </div>
        </div>
        <div className="ai-card-right">
          <div className="ai-card-photo">
            <img src={Img2} alt="Busi-Guild" className="ai-card-image" />
          </div>
        </div>
      </div>
    </div>
  );
});

export default AICards;
