import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import '../LoginPage/Login.css';
import ImgLogin from '../../../assets/LoginImage.png';

function ForgotPass() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false); 
    const [timer, setTimer] = useState(30); 
    const navigate = useNavigate();  

    useEffect(() => {
        let interval = null;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval); 
    }, [timer]);

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        setIsOtpSent(true);
        setTimer(30);
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    const handleResendOtp = () => {
        setTimer(30);
        alert("OTP resemded!");
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleRecoverypassClick = () => {
        navigate('/recovery');
    };

    const handleBackClick = () => {
        setIsOtpSent(false); 
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-form-section">
                    <h2 className="login-heading">Forgot Password</h2>
                    
                    {isOtpSent && (
                        <button onClick={handleBackClick} className="back-btn">
                            &larr; Back to Email
                        </button>
                    )}

                    <form onSubmit={isOtpSent ? handleOtpSubmit : handleEmailSubmit} className="login-form">
                        {!isOtpSent ? (
                            <>
                                <div className="input-group">
                                    <label htmlFor="email" className="input-label">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required 
                                        className="input-field" 
                                    />
                                </div>

                                <button type="submit" className="login-btn">Continue</button>
                            </>
                        ) : (
                            <>
                                <div className="input-group">
                                    <label htmlFor="otp" className="input-label">Enter OTP</label>
                                    <input 
                                        type="text" 
                                        id="otp" 
                                        name="otp" 
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)} 
                                        required 
                                        className="input-field"
                                    />
                                </div>
                                    <a onClick={handleRecoverypassClick} className="login-btn">Submit</a>

                                <div className="resend-otp">
                                    {timer > 0 ? (
                                        <button type="button" className="resend-btn" disabled>
                                            Resend OTP in {timer}s
                                        </button>
                                    ) : (
                                        <button type="button" className="resend-btn" onClick={handleResendOtp}>
                                            Resend OTP
                                        </button>
                                    )}
                                </div>
                            </>
                        )}

                        <div className="register-link">
                            <p className='para-register'>Don't have an account? <a onClick={handleRegisterClick} className="register-link-text">Register Here</a></p>
                        </div>
                    </form>
                </div>

                <div className="login-image-section">
                    <img src={ImgLogin} alt="Login Image" className="login-image" />
                </div>
            </div>
        </div>
    );
}

export default ForgotPass;
