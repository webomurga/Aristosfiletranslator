import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from './Alert'; // Import Alert component

const Header = ({ user, setUser, isLoginModalOpen, setIsLoginModalOpen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [alert, setAlert] = useState(null); // State for managing the alert
  const [credits, setCredits] = useState(0); // State for storing credits

  const fetchCredits = async (token) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/get-credits', { token });
      setCredits(response.data.credits); // Assuming the API returns an object with a "credits" property
    } catch (error) {
      console.error("Error fetching credits:", error);
      setCredits(231); // If there's an error, set credits to 231
    }
  };

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem('token');
      fetchCredits(token); // Fetch credits on user login
    }
  }, [user]); // Re-run the effect when user changes

  const closeModal = (e) => {
    if (e.target.classList.contains('modal') || e.target.classList.contains('close-btn')) {
      setIsLoginModalOpen(false);
      setIsSignUp(false);
      setIsForgotPassword(false);
      setEmail('');
      setPassword('');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      const token = response.data.token;

      localStorage.setItem('token', token);

      const userInfoResponse = await axios.post('http://localhost:3000/auth/get-info', { token });
      localStorage.setItem('email', userInfoResponse.data.email);
      setUser({ email: userInfoResponse.data.email });

      setAlert({
        type: 'success',
        message: `Logged in successfully, welcome!`,
      });
      setIsLoginModalOpen(false);

      // Fetch credits after login
      fetchCredits(token);
    } catch (error) {
      setAlert({
        type: 'danger',
        message: `Login failed: ${error.response?.data?.message || 'Unknown error'}`,
      });
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/signup', { email, password });
      const token = response.data.token;

      localStorage.setItem('token', token);

      const userInfoResponse = await axios.post('http://localhost:3000/auth/get-info', { token });
      localStorage.setItem('email', userInfoResponse.data.email);
      setUser({ email: userInfoResponse.data.email });

      setAlert({
        type: 'success',
        message: `Registration successful, welcome!`,
      });
      setIsLoginModalOpen(false);

      // Fetch credits after registration
      fetchCredits(token);
    } catch (error) {
      setAlert({
        type: 'danger',
        message: `Registration failed: ${error.response?.data?.message || 'Unknown error'}`,
      });
    }
    setIsSignUp(false);
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/reset-password', { email });
      setAlert({
        type: 'success',
        message: `Reset password email sent: ${response.data.message}`,
      });
    } catch (error) {
      setAlert({
        type: 'danger',
        message: `Reset password failed: ${error.response?.data?.message || "Unknown error"}`,
      });
    }
  };

  return (
    <>
      <div className="header">
        {user ? (
          <>
            <span className="user-email"><strong>{user.email}</strong></span>
            <span className="bar-sign"> | </span>
            <span className="credits">Credits: <strong>{credits}</strong></span>
            <span className="bar-sign"> | </span>
            <button className="login-btn" onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('email');
              setUser(null);
            }}>Logout</button>
          </>
        ) : (
          <button className="login-btn" onClick={() => setIsLoginModalOpen(true)}>Login</button>
        )}
      </div>

      {/* Display alert if present */}
      {alert && <Alert type={alert.type} message={alert.message} />}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <h2>{isSignUp ? 'Sign Up' : isForgotPassword ? 'Forgot Password' : 'Login'}</h2>
            <hr />
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            {!isForgotPassword && (
              <>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </>
            )}
            {isForgotPassword ? (
              <button className="reset-btn" onClick={handleForgotPassword}>Reset Password</button>
            ) : (
              <div className="modal-buttons">
                <button onClick={isSignUp ? handleRegister : handleLogin}>{isSignUp ? 'Sign Up' : 'Login'}</button>
                <button className="close-btn" onClick={closeModal}>Close</button>
              </div>
            )}
            <div className="modal-footer">
              {!isSignUp && !isForgotPassword && (
                <>
                  <p onClick={() => setIsSignUp(true)}>Sign Up</p>
                  <p onClick={() => setIsForgotPassword(true)}>Forgot Password?</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          .header { 
            display: flex; 
            justify-content: flex-end; 
            align-items: center; 
            border-bottom: 2px solid #008b8b; 
            padding-bottom: 10px; 
            animation: fadeIn 0.5s ease-out; 
          }

          .login-btn { 
            background: transparent; 
            border: none; 
            cursor: pointer; 
            font-size: 16px; 
            transition: color 0.3s ease; 
          }

          .login-btn:hover { 
            color: #008b8b;
          }

          .user-email {
            padding-right: 6px;
          }

          .credits {
            padding: 0 6px;
            font-size: 16px;
          }

          .credits strong {
            color: #008b8b;
          }
      
          .bar-sign { 
            padding: 0;
            color: #008b8b;
          }

          /* Modal Styles */
          .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.5s ease-out;
          }
          
          .modal-content {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            width: 300px;
            text-align: center;
            animation: slideUp 0.5s ease-out;
          }

          .modal input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
            border: 1px solid #ccc;
            max-width: 280px;
          }

          .modal-buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
          }

          .modal-buttons button {
            padding: 10px 20px;
            cursor: pointer;
            font-size: 16px;
            border-radius: 5px;
            border: none;
            transition: background-color 0.3s ease;
          }

          .modal-buttons button:first-child {
            background-color: #008b8b;
            color: white;
          }

          .modal-buttons button:first-child:hover {
            background-color: #007b7b;
          }

          .modal-buttons button:last-child {
            background-color: #ccc;
            color: black;
          }

          .modal-buttons button:last-child:hover {
            background-color: #bbb;
          }

          .modal-footer p {
            margin-top: 10px;
            cursor: pointer;
            color: #008b8b;
            transition: color 0.3s ease;
          }

          .modal-footer p:hover {
            color: #007b7b;
          }

          .reset-btn {
            background-color: #008b8b;
            color: white;
            margin-top: 20px;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 16px;
            border: none;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .reset-btn:hover {
            background-color: #007b7b;
          }

          /* Keyframe Animations */
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          @keyframes slideUp {
            0% { transform: translateY(30px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </>
  );
};

export default Header;
