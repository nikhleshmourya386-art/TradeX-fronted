import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LogReg.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [stage, setStage] = useState('email');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const sendOtp = async () => {
    setError('');
    setMessage('');
    try {
      await axios.post('http://localhost:3000/api/auth/forgot-password', { email });
      setStage('otp');
      setMessage('OTP sent to your email.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  const resetPassword = async () => {
    setError('');
    setMessage('');
    try {
      await axios.post('http://localhost:3000/api/auth/reset-password', {
        email,
        otp,
        newPassword,
      });
      setMessage('Password reset successfully. Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div className="forgot-wrapper">
      <div className="forgot-box">
        <h2>🔒 Forgot Password</h2>

        {message && <div className="info success">{message}</div>}
        {error && <div className="info error">{error}</div>}

        {stage === 'email' ? (
          <>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="primary-btn" onClick={sendOtp}>Send OTP</button>
          </>
        ) : (
          <>
            <label>OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className="success-btn" onClick={resetPassword}>Reset Password</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
