import React, { useState, useContext } from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import './index.css';

const LoginPopUp = () => {
    const { url, setToken, setUsername } = useContext(StoreContext);

    // State for controlling the form view (Login or Sign Up)
    const [currentState, setCurrentState] = useState("Login");

    // State for form data
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });

    // State for error messages
    const [errorMessage, setErrorMessage] = useState('');

    // State for controlling password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Handle input changes
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    // Handle login or registration
    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        newUrl += currentState === 'Login' ? '/api/user/login' : '/api/user/register';

        try {
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username);
                setUsername(response.data.username);
                window.location.reload();
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <div className='login-popup'>
            <form className='login-popup-container' onSubmit={onLogin}>
                <div className='login-popup-title'>
                    <h2>{currentState}</h2>
                    <img
                        src={assets.cross_icon}
                        className='login-popup-title-image'
                        onClick={() => window.location.reload()}
                        alt='Cross'
                    />
                </div>
                <div className='login-popup-inputs'>
                    {currentState !== 'Login' && (
                        <input
                            type='text'
                            id='name'
                            name='name'
                            className='login-popup-input'
                            value={data.name}
                            onChange={onChangeHandler}
                            placeholder='Your Name'
                            autoComplete='name'
                            required
                        />
                    )}
                    <input
                        type='email'
                        id='email'
                        name='email'
                        className='login-popup-input'
                        value={data.email}
                        onChange={onChangeHandler}
                        placeholder='Your Email'
                        autoComplete='email'
                        required
                    />
                    <div className='login-popup-password-container'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            name='password'
                            className='login-popup-input'
                            value={data.password}
                            onChange={onChangeHandler}
                            placeholder='Password'
                            autoComplete='current-password'
                            required
                        />
                        <img
                            src={showPassword ? assets.hide_icon : assets.view_icon}
                            className='passwords-icon'
                            onClick={togglePasswordVisibility}
                            alt={showPassword ? 'Hide Icon' : 'View Icon'}
                        />
                    </div>
                </div>
                <div>
                    <button type='submit' className='login-popup-button'>
                        {currentState === 'Sign Up' ? 'Create an Account' : 'Login'}
                    </button>
                    {errorMessage && (
                        <p className='login-popup-error'>*{errorMessage}</p>
                    )}
                </div>
                <div className='login-popup-condition'>
                    <input
                        type='checkbox'
                        id='terms'
                        name='terms'
                        className='login-popup-condition-input'
                        required
                    />
                    <label htmlFor='terms'>
                        By continuing, I agree to the terms of use & privacy policy.
                    </label>
                </div>
                {currentState === 'Login' ? (
                    <p>
                        Create a new account?{' '}
                        <span
                            className='login-popup-span'
                            onClick={() => setCurrentState("Sign Up")}
                        >
                            Click here
                        </span>
                    </p>
                ) : (
                    <p>
                        Already have an account?{' '}
                        <span
                            className='login-popup-span'
                            onClick={() => setCurrentState("Login")}
                        >
                            Login here
                        </span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPopUp;
