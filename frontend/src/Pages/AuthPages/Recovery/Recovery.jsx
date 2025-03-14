import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import '../LoginPage/Login.css';
import ImgLogin from '../../../assets/LoginImage.png';

function Recovery() {
    const [isChangePassword, setIsChangePassword] = useState(false); 
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleLoginWithoutPassword = () => {
        navigate('/dashboard');  
    };

    const handleChangePassword = () => {
        setIsChangePassword(true);  
    };

    const handleSubmitNewPassword = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        alert("Password changed successfully!");
        navigate('/login'); 
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-form-section">
                    <h2 className="login-heading">Password Recovered</h2>
                    
                    {!isChangePassword ? (
                        <div className="recovery-options">
                            <button type="button" className="recovery-btn" onClick={handleLoginWithoutPassword}>
                                Login without Password
                            </button>
                            <button type="button" className="recovery-btn" onClick={handleChangePassword}>
                                Change Password
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmitNewPassword} className="login-form">
                            <div className="input-group">
                                <label htmlFor="newPassword" className="input-label">New Password</label>
                                <input 
                                    type="password" 
                                    id="newPassword" 
                                    name="newPassword" 
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)} 
                                    required 
                                    className="input-field"
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
                                <input 
                                    type="password" 
                                    id="confirmPassword" 
                                    name="confirmPassword" 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                    required 
                                    className="input-field"
                                />
                            </div>

                            <button type="submit" className="login-btn">
                                Submit New Password
                            </button>
                        </form>
                    )}

                    <div className="register-link">
                        <p className='para-register'>Don't have an account? <a onClick={handleRegisterClick} className="register-link-text">Register Here</a></p>
                    </div>
                </div>

                <div className="login-image-section">
                    <img src={ImgLogin} alt="Login Image" className="login-image" />
                </div>
            </div>
        </div>
    );
}

export default Recovery;
