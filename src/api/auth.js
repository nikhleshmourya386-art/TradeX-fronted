import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/auth"; // Make sure port matches your backend

// Register user and trigger OTP email
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data; // success
  } catch (error) {
    console.error("Register API Error:", error.response?.data || error.message);
    throw error.response?.data?.message || error.response?.data?.error || "Registration failed";
  }
};

// Resend OTP
export const resendOtp = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/resend-otp`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Failed to resend OTP";
  }
};

// Verify OTP
export const verifyOtp = async (email, otp) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/verify-otp`,
      { email, otp },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Invalid OTP";
  }
};


// Login (only after OTP verification)
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data; // contains token and user
  } catch (error) {
    throw error.response?.data?.error || "Login failed";
  }
};

// Logout (dummy or token removal on frontend)
export const logoutUser = async () => {
  try {
    await axios.post(`${API_BASE_URL}/logout`);
  } catch (error) {
    console.error("Logout failed", error);
  }
};

// Fetch dashboard (protected route, include token)
export const fetchDashboard = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Failed to fetch dashboard data";
  }
};

