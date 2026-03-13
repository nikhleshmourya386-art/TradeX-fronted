// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./LogReg.css";
// import Navbar from "./landing_page/Navbar";

// const Login = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [otpError, setOtpError] = useState("");
//   const [otpSuccess, setOtpSuccess] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
//   const [resendCooldown, setResendCooldown] = useState(0);

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     if (params.get("error") === "login_required") {
//       setError("You must be logged in to access the database.");
//     }
//   }, [location.search]);

//   useEffect(() => {
//     let timer;
//     if (resendCooldown > 0) {
//       timer = setInterval(() => {
//         setResendCooldown((prev) => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [resendCooldown]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     setTimeout(async () => {
//       try {
//         const response = await axios.post(
//           "http://localhost:3000/api/auth/login",
//           { email, password,},
//           { withCredentials: true }
//         );
//         localStorage.setItem("token", response.data.token);
// localStorage.setItem("user", JSON.stringify(response.data.user)); // ✅ Store the user

//         navigate("/dashboard", { replace: true });
//       } catch (error) {
//         setLoading(false);
//         if (error.response?.data?.message) {
//           setError(error.response.data.message);
//           if (
//             error.response.data.message ===
//             "Email not verified, Please verify OTP."
//           ) {
//             setTimeout(() => setIsOtpModalOpen(true), 1000);
//           }
//         } else {
//           setError("An error occurred. Please try again later.");
//         }
//       }
//     }, 1500);
//   };

//   const handleResendOtp = async () => {
//     try {
//       if (resendCooldown > 0) return;
//       setOtpSuccess("OTP has been sent to your email");
//       setResendCooldown(60);
//     } catch (error) {
//       setOtpError("Failed to resend OTP. Please try again later");
//     }
//   };

//   const handleVerifyOtp = async () => {
//     setOtpError("");
//     setOtpSuccess("");
//     try {
//       await axios.post("http://localhost:3000/api/auth/verify-otp", {
//         email,
//         otp,
//       });
//       setTimeout(() => setIsOtpModalOpen(false), 2000);
//     } catch (error) {
//       setError("Invalid OTP. Please try again.");
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       <p></p>
//       navigate("/dashboard"); // redirect if already logged in
//     }
//   }, []);

//   return (

// <>
//     <Navbar/>

//     <div className="login-container">
//       <div className="login-card">
//         <h2>Login</h2>
//         {error && <div className="error-box">{error}</div>}
//         <form onSubmit={handleLogin}>
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button type="submit" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p>
//           Don't have an account? <a href="/register">Register here</a>
//         </p>
//         <p>
//           <a href="/forgot-password">Forgot Password?</a>
//         </p>
//       </div>

//       {isOtpModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <div className="modal-header">
//               <h5>Verify OTP</h5>
//               <button onClick={() => setIsOtpModalOpen(false)}>X</button>
//             </div>
//             <div className="modal-body">
//               {otpSuccess && <div className="success-box">{otpSuccess}</div>}
//               {otpError && <div className="error-box">{otpError}</div>}

//               <label>Enter OTP</label>
//               <input
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//             </div>
//             <div className="modal-footer">
//               <button onClick={handleVerifyOtp}>Validate OTP</button>
//               <button onClick={handleResendOtp} disabled={resendCooldown > 0}>
//                 {resendCooldown > 0
//                   ? `Resend in ${resendCooldown}s`
//                   : "Resend OTP"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>

//     </>
//   );
// };

// export default Login;





import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "./landing_page/Navbar";
import "./LogReg.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("error") === "login_required") {
      setError("You must be logged in to access the dashboard.");
    }
  }, [location.search]);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => setResendCooldown((p) => p - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed.";
      setError(msg);
      if (msg.includes("Email not verified")) {
        setTimeout(() => setIsOtpModalOpen(true), 500);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/verify-otp", {
        email,
        otp,
      });
      setOtpSuccess(res.data.message);
      setOtpError("");
      setTimeout(() => setIsOtpModalOpen(false), 1500);
    } catch {
      setOtpError("Invalid OTP. Try again.");
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    try {
      await axios.post("http://localhost:3000/api/auth/resend-otp", { email });
      setOtpSuccess("OTP sent again to your email.");
      setResendCooldown(60);
    } catch {
      setOtpError("Failed to resend OTP.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-card">
          <h2>Login</h2>
          {error && <div className="error-box">{error}</div>}

          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p>
            Don’t have an account? <a href="/register">Register</a>
          </p>
          <p>
            <a href="/forgot-password">Forgot Password?</a>
          </p>
        </div>

        {isOtpModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h5>Verify OTP</h5>
                <button onClick={() => setIsOtpModalOpen(false)}>X</button>
              </div>
              <div className="modal-body">
                {otpSuccess && <div className="success-box">{otpSuccess}</div>}
                {otpError && <div className="error-box">{otpError}</div>}

                <label>Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button onClick={handleVerifyOtp}>Validate OTP</button>
                <button
                  onClick={handleResendOtp}
                  disabled={resendCooldown > 0}
                >
                  {resendCooldown > 0
                    ? `Resend in ${resendCooldown}s`
                    : "Resend OTP"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
