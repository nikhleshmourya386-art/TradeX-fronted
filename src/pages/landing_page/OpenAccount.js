import React from 'react';
import { Link } from 'react-router-dom';

function OpenAccount() {
  return (
    <div style={containerStyle}>
      <div style={textCenterStyle}>
        <h1 style={{ marginTop: "40px" }}>Open a TradeX Account</h1>
        <p>Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
        <Link to="/register" style={buttonStyle}>Sign up For Free</Link>
      </div>
    </div>
  );
}

// Inline styles
const containerStyle = {
  padding: "40px",
  marginBottom: "60px",
  maxWidth: "1200px",
  margin: "0 auto",
};

const textCenterStyle = {
  textAlign: "center",
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "18px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  textDecoration: "none",
  display: "inline-block",
  marginTop: "20px",
};

export default OpenAccount;
