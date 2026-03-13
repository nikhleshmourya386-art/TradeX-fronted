import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import navigation hook
import './AddMoney.css';
import Menu from './Menu';

const AddMoney = () => {
  const [formData, setFormData] = useState({
    amount: '',
    paymentMode: 'UPI',
    transactionId: '',
    remarks: '',
  });

  const navigate = useNavigate(); // ✅ initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(formData.amount) < 10) {
      return alert("Amount must be at least ₹10.");
    }

    if (formData.transactionId && !/^[a-zA-Z0-9]{6,}$/.test(formData.transactionId)) {
      return alert("Transaction ID must be alphanumeric and at least 6 characters.");
    }

    if (formData.remarks.length > 100) {
      return alert("Remarks should be less than 100 characters.");
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) return alert("User not found. Please log in again.");

    try {
      const res = await fetch("http://localhost:3000/api/funds/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId: user._id }),
      });
      const data = await res.json();

      if (res.ok) {
        alert("✅ Funds Added Successfully!");
        navigate("/funds"); // ✅ navigate to funds page
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Failed to add funds.");
    }
  };

  return (
    <>
      <Menu />

      <div className="add-money-container">
        <h2>Add Funds to Your Trading Account</h2>

        <form onSubmit={handleSubmit} className="add-money-form">
          <label>Amount (₹)</label>
          <input
            type="number"
            name="amount"
            min="10"
            value={formData.amount}
            onChange={handleChange}
            required
            title="Minimum amount should be ₹10"
          />

          <label>Payment Mode</label>
          <select
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleChange}
          >
            <option value="UPI">UPI</option>
            <option value="Net Banking">Net Banking</option>
            <option value="Debit Card">Debit Card</option>
          </select>

          <label>Transaction ID (if available)</label>
          <input
            type="text"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleChange}
            placeholder="e.g., TXN12345"
            pattern="^[a-zA-Z0-9]{6,}$"
            title="Alphanumeric, at least 6 characters"
          />

          <div className="button-wrapper">
            <button type="submit">Add Funds</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddMoney;
 