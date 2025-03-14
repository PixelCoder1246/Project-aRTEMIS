import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Turnstile from 'react-turnstile';
import './Login.css';
import ImgLogin from '../../../assets/LoginImage.png';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { z } from 'zod';
import { useAuth } from "../../../hooks/useAuth";

const TURNSTILE_SITE_KEY = "0x4AAAAAABAJs8UnxeYb_Dfh";
const API_URL = import.meta.env.VITE_API_URL;



const loginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});

function Login() {
    const { setUser, setIsAuthenticated, checkAuthStatus } = useAuth();
    const [turnstileToken, setTurnstileToken] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [apiResponse, setAPIresponse] = useState(false);
    const [successAPI, setSuccessAPI] = useState(false);
    const navigateRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");

    const togglePassword = () => setShowPassword(!showPassword);
    const handleRegisterClick = () => navigate('/register');

    const handleInputChange = (e) => {
        setErrorMessage('');
        setErrors({});
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleForgotPassClick = () =>{
        navigate('/forgotpass');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = loginSchema.safeParse(formData);
        if (!result.success) {
            const formattedErrors = {};
            result.error.errors.forEach((err) => {
                formattedErrors[err.path[0]] = err.message;
            });
            setErrors(formattedErrors);
            return;
        }

        if (!turnstileToken) {
            setErrorMessage("Please complete the security verification.");
            return;
        }

        try {
            const response = await fetch(`https://project-artemis-production.up.railway.app/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({ ...formData, turnstileToken }),
            });

            const data = await response.json();
            setAPIresponse(data.message);

            if (data.success) {
                setSuccessAPI(true);
                navigateRef.current = setTimeout(async () => {
                    await checkAuthStatus();
                    setIsAuthenticated(true);
                    setUser(data.user);
                    navigate('/');
                }, 2000);
            } else {
                setErrorMessage("Wrong Credentials!");
            }
        } catch (error) {
            console.error("Error Logging In:", error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-form-section">
                    <h2 className="login-heading">Login to Your Account</h2>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="input-group">
                            <label htmlFor="email" className="input-label">Email</label>
                            <input type="email" id="email" name="email" required value={formData.email} className="input-field" onChange={handleInputChange} />
                        </div>
                        {errors.email && <p className="error-text">{errors.email}</p>}
                        <div className="input-group">
                            <label htmlFor="password" className="input-label">Password</label>
                            <div className="password-container">
                                <input type={showPassword ? "text" : "password"} id="password" name="password" required value={formData.password} onChange={handleInputChange} className="input-field" />
                                <button type="button" className="toggle-btn" onClick={togglePassword}>{showPassword ? "Hide" : "Show"}</button>
                            </div>
                        </div>
                        {errors.password && <p className="error-text">{errors.password}</p>}
                        <div className='center-cloudflare'>
                            <Turnstile
                                sitekey={TURNSTILE_SITE_KEY}
                                onVerify={(token) => setTurnstileToken(token)}
                            />
                        </div>

                        <button type="submit" className="login-btn">Login</button>
                        {errorMessage && <p style={{ textAlign: 'center' }}>{errorMessage}</p>}

                        <div className="register-link">
                            <p className='para-register'>Forgotten Password? <a onClick={handleForgotPassClick} className="register-link-text">Forgot Password</a></p>
                        </div>

                        <div className="register-link">
                            <p className='para-register'>Don't have an account? <a onClick={handleRegisterClick} className="register-link-text">Register Here</a></p>
                        </div>
                    </form>
                </div>

                <div className="login-image-section">
                    <img src={ImgLogin} alt="Login Image" className="login-image" />
                </div>
            </div>

            {successAPI && (
                <div className='login-success-modal'>
                    <span>{apiResponse}</span>
                    <DotLottieReact src="https://lottie.host/603bce64-47b7-49ae-98be-3bd3cd5ef3e7/F6EcBgg9QQ.lottie" autoplay className='green-tick' />
                </div>
            )}
        </div>
    );
}

export default Login;
