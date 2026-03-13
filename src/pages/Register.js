import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, verifyOtp, resendOtp } from "../api/auth";
import "./LogReg.css";
import Navbar from "./landing_page/Navbar";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      await registerUser(formData);
      setMessage("Registration successful. OTP sent to your email.");
      setTimeout(() => setIsOtpModalOpen(true), 1500);
    } catch (err) {
      setError(err?.message || "Registration failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpError("");
    setOtpSuccess("");
    try {
      await verifyOtp(formData.email, otp.toString().trim());

      setOtpSuccess("Email Verified! Redirecting to login...");
      setTimeout(() => navigate("/kyc"), 2000);
    } catch (err) {
      setOtpError(err?.message || "Invalid OTP. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp(formData.email);
      setOtpSuccess("OTP has been resent to your email.");
      setResendCooldown(60);
    } catch (err) {
      setOtpError(err?.message || "Failed to resend OTP.");
    }
  };

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1); // Prevent back navigation
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard"); // redirect if already logged in
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <div className="auth-card">
          <h2>Register</h2>
          {message && <div className="success-msg">{message}</div>}
          {error && <div className="error-msg">{error}</div>}

          <form onSubmit={handleRegister}>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="extra-links">
            <p>
              Already have an account? <a href="/login">Login here</a>
            </p>
            <p>
              <a href="/forgot-password">Forgot Password?</a>
            </p>
          </div>
        </div>

        {isOtpModalOpen && (
          <div className="modal-overlay">
            <div className="modal-box">
              <div className="modal-header">
                <h3>📨 Email Verification</h3>
                <button className="modal-close" onClick={() => setIsOtpModalOpen(false)}>×</button>
              </div>

              <div className="modal-body">
                {otpSuccess && <div className="info success">{otpSuccess}</div>}
                {otpError && <div className="info error">{otpError}</div>}

                <label htmlFor="otpInput">Enter the OTP sent to your email</label>
                <input
                  id="otpInput"
                  type="text"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                <div className="modal-footer">
                  <button className="verify-btn" onClick={handleVerifyOtp}>✅ Verify OTP</button>

                  <button
                    className={`resend-btn ${resendCooldown > 0 ? 'disabled' : ''}`}
                    onClick={handleResendOtp}
                    disabled={resendCooldown > 0}
                  >
                    🔁 {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Register;
