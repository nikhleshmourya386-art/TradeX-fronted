import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddMoney.css';
import Menu from './Menu';

const DeductMoney = () => {
  const [formData, setFormData] = useState({
    amount: '',
    paymentMode: 'UPI',
    transactionId: '',
    remarks: '',
  });

  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) return;

    const fetchBalance = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/funds/balance/${user._id}`);
        const data = await res.json();
        setBalance(data.balance || 0);
      } catch (err) {
        console.error("Failed to fetch balance:", err);
      }
    };

    fetchBalance();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amount = Number(formData.amount);
    if (amount < 1) return alert("❌ Amount must be at least ₹1.");
    if (amount > balance) return alert("❌ Amount exceeds available balance.");
    if (formData.transactionId && !/^[a-zA-Z0-9]{6,}$/.test(formData.transactionId)) {
      return alert("Transaction ID must be alphanumeric and at least 6 characters.");
    }
    if (formData.remarks.length > 100) {
      return alert("Remarks should be less than 100 characters.");
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) return alert("User not found. Please log in again.");

    try {
      const res = await fetch("http://localhost:3000/api/funds/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId: user._id }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Money Deducted Successfully!");
        window.dispatchEvent(new Event("balanceUpdated")); // 🔁 notify Funds.jsx
        navigate("/funds");
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Failed to deduct funds.");
    }
  };

  return (
    <>
      <Menu />

      <div className="add-money-container">
        <h2>Deduct Money from Account</h2>

        <p style={{ color: "red", fontWeight: "bold" }}>
          Available Balance: ₹{balance.toFixed(2)}
        </p>

        <form onSubmit={handleSubmit} className="add-money-form">
          <label>Amount to Deduct (₹)</label>
          <input
            type="number"
            name="amount"
            min="1"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <label>Mode</label>
          <select
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleChange}
          >
            <option value="UPI">UPI</option>
            <option value="Adjustment">Adjustment</option>
            <option value="Manual">Manual</option>
          </select>

          <label>Transaction ID (optional)</label>
          <input
            type="text"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleChange}
            placeholder="e.g., TXN12345"
            pattern="^[a-zA-Z0-9]{6,}$"
            title="At least 6 alphanumeric characters"
          />

          <label>Remarks (optional)</label>
          <input
            type="text"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            maxLength={100}
          />

          <div className="button-wrapper">
            <button type="submit">Deduct Funds</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DeductMoney;
