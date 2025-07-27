import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css'; // Import the CSS file

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate sending password reset email
    if (email) {
      setMessage(`Password reset link sent to ${email}`);
    } else {
      setMessage('Please enter your email');
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2 className="forgot-title">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="forgot-form">
          <label htmlFor="email" className="forgot-label">Email Address:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="forgot-input"
          />
          <button type="submit" className="forgot-button">Send Reset Link</button>
          {message && <p className="forgot-message">{message}</p>}
        </form>
        <p className="forgot-login-link">
          Remembered your password? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
