import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ React Router for navigation
import './KYCForm.css';

const KYCForm = () => {
  const navigate = useNavigate(); // ✅ initialize navigation

  const [formData, setFormData] = useState({
    fullName: '',
    panNumber: '',
    aadhaarNumber: '',
    bankName: '',
    accountNumber: '',
    ifsc: '',
    mobile: '',
    email: '',
    declaration: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/kyc/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("✅ KYC Submitted Successfully");
        navigate('/login'); // ✅ navigate to dashboard (or any route you prefer)
      } else {
        alert("❌ Failed to submit KYC: " + result.error);
      }
    } catch (error) {
      console.error("Error submitting KYC:", error);
      alert("❌ Submission error: Check console for details.");
    }
  };

  return (
    <form className="kyc-form" onSubmit={handleSubmit}>
      <h2>TradeX KYC Form</h2>

      <div className="kyc-grid">
        <div className="kyc-left">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label>Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            pattern="[6-9]{1}[0-9]{9}"
            title="Enter valid 10-digit Indian mobile number"
          />

          <label>PAN Number</label>
          <input
            type="text"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleChange}
            required
            pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
            title="Enter valid PAN (e.g., ABCDE1234F)"
          />

          <label>Aadhaar Number</label>
          <input
            type="text"
            name="aadhaarNumber"
            value={formData.aadhaarNumber}
            onChange={handleChange}
            required
            pattern="\d{12}"
            title="Enter 12-digit Aadhaar number"
          />
        </div>

        <div className="kyc-right">
          <label>Bank Name</label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            required
          />

          <label>Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            required
          />

          <label>IFSC Code</label>
          <input
            type="text"
            name="ifsc"
            value={formData.ifsc}
            onChange={handleChange}
            required
            pattern="^[A-Z]{4}0[A-Z0-9]{6}$"
            title="Enter valid IFSC code (e.g., SBIN0001234)"
          />

          <label>Email ID</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <label className="checkbox">
        <input
          type="checkbox"
          name="declaration"
          checked={formData.declaration}
          onChange={handleChange}
          required
        />
        I hereby declare that the above information is true and correct to the best of my knowledge.
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default KYCForm;
