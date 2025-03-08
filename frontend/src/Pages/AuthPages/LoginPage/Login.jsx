import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import ImgLogin from '../../../assets/LoginImage.png';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { z } from 'zod';
import { useAuth } from "../../../useAuth";


const loginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
})

function Login() {
    const { setUser, setIsAuthenticated, checkAuthStatus } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({});
    const [apiResponse, setAPIresponse] = useState(false);
    const [successAPI, setSuccessAPI] = useState(false);
    const navigateRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState("")

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleInputChange = (e) => {
        setErrorMessage('');
        setErrors({});
        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
        console.log(value);

    };

    const handleSubmit = async(e) => {
        try {
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

        const data = await fetch('http://localhost:3000/login', {
            method : 'POST',
            headers : {
                "Content-type" : "application/json"
            },
            credentials : 'include',
            body : JSON.stringify(formData),
        })

        const response = await data.json();

        setAPIresponse(response.message);

        if(response.success) {
            setSuccessAPI(true);
            
            navigateRef.current = setTimeout(async()=> {
                await checkAuthStatus();
                setIsAuthenticated(true);
                setUser(data.user);
                navigate('/');
            },2000)
        } else {
            setErrorMessage("Wrong Credentials!");
            
        }
        } catch (error) {
            console.log("Error Logging In: ", error);
        }
    };

    return (
        <>
        <div className="login-container">
            <div className="login-content">
                <div className="login-form-section">
                    <h2 className="login-heading">Login to Your Account</h2>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="input-group">
                            <label htmlFor="email" className="input-label">Email</label>
                            <input type="email" id="email" name="email" required value={FormData.email} className="input-field" onChange={handleInputChange} />
                        </div>
                        {errors.email && <p className="error-text">{errors.email}</p>}
                        <div className="input-group">
                            <label htmlFor="password" className="input-label">Password</label>
                            <div className="password-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    required
                                    value={FormData.email}
                                    onChange={handleInputChange}
                                    className="input-field"
                                />
                                <button type="button" className="toggle-btn" onClick={togglePassword}>
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>
                        {errors.password && <p className="error-text">{errors.password}</p>}

                        <button type="submit" className="login-btn">Login</button>
                        {
                            errorMessage &&
                            <p style={{textAlign:'center'}}>{errorMessage}</p>
                        }

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
        {
            successAPI &&
            <div className='login-success-modal'>
          <span>{apiResponse}</span>
          <DotLottieReact
            src="https://lottie.host/603bce64-47b7-49ae-98be-3bd3cd5ef3e7/F6EcBgg9QQ.lottie"
            autoplay
            className='green-tick'
          />
        </div>
        }
        </>
    );
}

export default Login;
