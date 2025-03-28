import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import ImgRegister from '../../../assets/RegisterImage.png';
import { AnimatePresence, motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { z } from 'zod';

const API_URL = import.meta.env.VITE_API_URL;


const signupSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters long!').max(35, 'Username must be at most 35 characters long!'),
    fname: z.string().min(3, 'First name must be at least 3 characters long!'),
    lname: z.string().min(3, 'Last name must be at least 3 characters!'),
    email: z.string().email('Invalid Email Format!'),
    password: z.string().min(8, 'Password must be at least 8 characters long!'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters long!'),
    age: z.number().positive().int().min(18, 'Age must be at least 18!').max(120, 'Age must be at most 120!'),
    devAI: z.string(),
    devAIversion: z.number().int().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ['confirmPassword'],
  })
  .refine((data)=> {
    if(data.devAI === "") {
      return false;
    } else {
      return true;
    }
  }, {
    message: "Please select an option!",
    path: ['devAI'],
  })
  .refine((data) =>  data.devAI === "no" || (data.devAI === "yes" && data.devAIversion !== undefined), {
    message: 'Please select a DevAI version!',
    path: ['devAIversion'],
  });

  const modalOpen = {
    initial: { opacity: 0, y: -200, scale: 0.5 },
    animate: { opacity: 1, y: -450, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -200, scale: 0.5, transition: { duration: 0.3 } },
  }


function Register() {
  const [isDevAIUser, setIsDevAIUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    devAI: false,
    devAIversion: '',
  });
  const [errors, setErrors] = useState({});
  const [apiResponse, setAPIresponse] = useState("");
  const [successAPI, setSuccessAPI] = useState(0);
  const timeoutRef = useRef(null);
  let navigateRef = useRef(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'devAI') {
      if(value === "yes") {
        setIsDevAIUser(true);
        setFormData((prev)=> ({...prev, devAI : value,  devAIversion: ''}));
      } else {
        setIsDevAIUser(false);
        setFormData((prev)=> ({...prev, devAI : value,  devAIversion: ''}));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setAPIresponse("");
    // console.log(formData);
    clearTimeout(timeoutRef.current);

    const parsedFormData = {
      ...formData,
      age: formData.age ? parseInt(formData.age, 10) : 0,
      devAIversion: formData.devAIversion ? parseInt(formData.devAIversion, 10) : undefined,
    };

    const result = signupSchema.safeParse(parsedFormData);

    console.log(result);

    if (!result.success) {
      const formattedErrors = {};
      result.error.errors.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setErrors(formattedErrors);
      return;
    }

    try {
      const data = await fetch(`https://project-artemis-production.up.railway.app/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      const response = await data.json();

      if (!response.success) {
        setAPIresponse(response.message);
        setSuccessAPI(2);
        timeoutRef.current = setTimeout(() => {
          setSuccessAPI(0);
        }, 5000);
        return;
      }

      setSuccessAPI(1);
      setAPIresponse(response.message);

      navigateRef.current = setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Signup API Error:", error);
      setAPIresponse("An error occurred. Please try again.");
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const handleLoginClick = () => navigate('/login');

  return (
    <>
      <div className={`register-container ${successAPI ? 'show-modal' : ''}`}>
        <div className="register-content">
          <div className="register-form-section">
            <h2 className="register-heading">Register Your Account</h2>
            <form onSubmit={handleSubmit} className="register-form">
              <div className="input-group">
                <label htmlFor="username" className="input-label">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="input-field"
                />
                {errors.username && <p className="error-text">{errors.username}</p>}
              </div>

              <div className="input-group">
                <label htmlFor="realFirstName" className="input-label">First Name</label>
                <input
                  type="text"
                  id="realFirstName"
                  name="fname"
                  value={formData.fname}
                  onChange={handleInputChange}
                  className="input-field"
                />
                {errors.fname && <p className="error-text">{errors.fname}</p>}
              </div>

              <div className="input-group">
                <label htmlFor="lastName" className="input-label">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lname"
                  value={formData.lname}
                  onChange={handleInputChange}
                  className="input-field"
                />
                {errors.lname && <p className="error-text">{errors.lname}</p>}
              </div>

              <div className="input-group">
                <label htmlFor="email" className="input-label">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              <div className="input-group">
                <label htmlFor="password" className="input-label">Password</label>
                <div className="password-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                  <button type="button" className="toggle-btn" onClick={togglePassword}>
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {errors.password && <p className="error-text">{errors.password}</p>}
              </div>

              <div className="input-group">
                <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
                <div className="password-container">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                  <button type="button" className="toggle-btn" onClick={toggleConfirmPassword}>
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
              </div>

              <div className="input-group">
                <label htmlFor="devAI" className="input-label">Will you be using DevAI tool?</label>
                <select onChange={handleInputChange} name="devAI" className="input-field">
                  <option value="">Select Yes or No</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.devAI && <p className="error-text">{errors.devAI}</p>}
              </div>

              {isDevAIUser && (
                <div className="input-group">
                  <label htmlFor="devAIversion" className="input-label">Which version do you want to choose?</label>
                  <select
                    id="devAIversion"
                    name="devAIversion"
                    value={formData.devAIversion}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="">Select Version</option>
                    <option value="1">Normal Version (v1)</option>
                    <option value="2">Intermediate Version (v2)</option>
                    <option value="3">Advanced Version (v3)</option>
                  </select>
                  {errors.devAIversion && <p className="error-text">{errors.devAIversion}</p>}
                </div>
              )}

              <div className="input-group">
                <label htmlFor="age" className="input-label">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="input-field"
                />
                {errors.age && <p className="error-text">{errors.age}</p>}
              </div>

              <button type="submit" className="submit-btn">Submit</button>
            </form>

            <div className="login-link">
              <p className="para-login">
                Already have an account?{' '}
                <a onClick={handleLoginClick} className="login-link-text">
                  Login Here
                </a>
              </p>
            </div>
          </div>

          <div className="register-image-section">
            <img src={ImgRegister} alt="Register Image" className="register-image" />
          </div>
        </div>
      </div>
      <AnimatePresence>
      {
        successAPI === 1 &&
        <motion.div {...modalOpen}>
          <div className='signup-success-modal'>
            <span>{apiResponse}</span>
            <DotLottieReact
              src="https://lottie.host/603bce64-47b7-49ae-98be-3bd3cd5ef3e7/F6EcBgg9QQ.lottie"
              autoplay
              className='green-tick'
            />
          </div>
        </motion.div>
      }
      </AnimatePresence>
      <AnimatePresence>
      {
        successAPI === 2 &&
        <motion.div {...modalOpen}>
          <div className='signup-success-modal'>
            <span>{apiResponse}</span>
            <DotLottieReact
              src="https://lottie.host/3d0b8dcd-daa0-4e2f-88d7-20bd8550f614/92vjr4gXqD.lottie"
              loop
              autoplay
              className='red-cross'
            />
          </div>
        </motion.div>
      }
      </AnimatePresence>
    </>
  );
}

export default Register;



