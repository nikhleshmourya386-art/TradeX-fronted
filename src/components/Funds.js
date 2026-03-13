import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";

const Funds = () => {
  const [balance, setBalance] = useState(0);

 useEffect(() => {
  const fetchBalance = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
        return alert("User not found. Please log in again.");
      }

      const res = await fetch(`http://localhost:3000/api/funds/balance/${user._id}`);
      const data = await res.json();
      setBalance(data.balance || 0);
    } catch (err) {
      console.error("Failed to fetch balance:", err);
    }
  };

  fetchBalance();

  const handleUpdate = () => fetchBalance(); // auto-refresh
  window.addEventListener("balanceUpdated", handleUpdate);

  return () => window.removeEventListener("balanceUpdated", handleUpdate);
}, []);


  return (
    <>
      <Menu />
     <Link to="/dashboard" className="back-btn">⬅ Back to Dashboard</Link>

      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI</p>
        <Link className="btn btn-blue" to="/adm">Add Funds</Link>
        <Link className="btn btn-blue" to="/wdm">Withdraw</Link>
      </div>

      <div className="row">
        <div className="col">
          <div className="table">
            <div className="data">
              <p>Available Balance</p>
              <p className="imp colored" style={{color:"blue" ,fontSize:"25px",fontWeight:"700"}}>₹{balance.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <Link className="btn btn-blue" to="/#">Open Account</Link>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Funds;
