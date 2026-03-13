import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WithdrawMoney.css';
import Menu from './Menu';

const WithdrawMoney = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: '',
    accountNumber: '',
    ifsc: '',
    paymentMode: 'Bank Transfer', // ✅ renamed from `mode`
    remarks: '',
  });

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) return alert("User not found");

    const fetchBalance = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/funds/balance/${user._id}`);
        const data = await res.json();
        setBalance(data.balance || 0);
      } catch (err) {
        console.error("Failed to load balance:", err);
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

    if (Number(formData.amount) <= 0) return alert("❌ Invalid withdrawal amount.");
    if (!formData.accountNumber || formData.accountNumber.length < 6) return alert("❌ Enter valid account number.");
    if (!formData.ifsc || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc)) return alert("❌ Enter valid IFSC code.");

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) return alert("User not found. Please login again.");

    try {
      const transactionId = "TXN" + Date.now(); // ✅ Generate transaction ID

      const response = await fetch("http://localhost:3000/api/funds/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          transactionId, // ✅ include it
          userId: user._id,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Withdraw response error:", errorText);
        return alert("❌ Error: " + errorText);
      }

      const data = await response.json();
      alert("✅ Withdrawal successful!");
      navigate('/funds');
    } catch (err) {
      console.error("Withdraw error:", err);
      alert("❌ Withdraw failed. Check console.");
    }
  };

  return (
    <>
      <Menu />
      <div className="withdraw-container">
        <h2>Withdraw Funds</h2>

        <p style={{ fontSize: "18px", fontWeight: "bold", color: "green" }}>
          Available Balance: ₹{balance.toFixed(2)}
        </p>

        <form onSubmit={handleSubmit} className="withdraw-form">
          <label>Withdrawal Amount (₹)</label>
          <input
            type="number"
            name="amount"
            min="10"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <label>Bank Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            required
            pattern="\d{9,18}"
            title="9–18 digits"
          />

          <label>IFSC Code</label>
          <input
            type="text"
            name="ifsc"
            value={formData.ifsc}
            onChange={handleChange}
            required
            pattern="^[A-Z]{4}0[A-Z0-9]{6}$"
            title="e.g. SBIN0001234"
          />

          <label>Mode of Transfer</label>
          <select
            name="paymentMode" // ✅ match backend schema
            value={formData.paymentMode}
            onChange={handleChange}
          >
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="UPI">UPI</option>
          </select>

          {/* <label>Remarks (optional)</label>
          <input
            type="text"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="e.g. Withdrawal for rent"
          /> */}

          <div className="button-wrapper">
            <button type="submit">Submit Withdrawal</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WithdrawMoney;
