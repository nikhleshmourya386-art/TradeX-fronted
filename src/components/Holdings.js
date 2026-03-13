
// SoldSharesPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import SoldSharesGraph from "./SoldSharesGraph";
import "./Orders.css";

const SoldSharesPage = () => {
  const [sold, setSold] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    const fetchSoldShares = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/orders/user/${userId}`);
        const orders = res.data.orders || [];

        const buyMap = {};
        const sellList = [];

        orders.forEach((order) => {
          const name = order.stockName;

          if (order.type === "buy") {
            if (!buyMap[name]) {
              buyMap[name] = { totalQty: 0, totalCost: 0 };
            }
            buyMap[name].totalQty += order.qty;
            buyMap[name].totalCost += order.qty * order.price;
          }

          if (order.type === "sell") {
            const avgBuy = buyMap[name] ? buyMap[name].totalCost / buyMap[name].totalQty : 0;
            const pnl = (order.price - avgBuy) * order.qty;

            sellList.push({
              stockName: name,
              qty: order.qty,
              price: order.price,
              soldOn: order.createdAt,
              avgBuyPrice: avgBuy.toFixed(2),
              pnl: pnl.toFixed(2),
            });
          }
        });

        setSold(sellList);
      } catch (err) {
        console.error("Error fetching sold shares:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchSoldShares();
  }, [userId]);

  const formatDateTime = (date) => {
    if (!date) return "--";
    return new Date(date).toLocaleString();
  };

  if (loading) return <p className="loading">Loading sold shares...</p>;

  return (
    <>
      <Menu />
      <div className="orders-container">
    <Link to="/dashboard" className="back-btn">⬅ Back to Dashboard</Link>

        <div className="section">
          <h2 className="section-title">🔴 Sold Shares (Detailed)</h2>
          {sold.length === 0 ? (
            <p className="empty-msg">No shares sold yet.</p>
          ) : (
            <>
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Stock</th>
                    <th>Qty</th>
                    <th>Sell Price</th>
                    <th>Avg Buy Price</th>
                    <th>Total</th>
                    <th>Profit/Loss</th>
                    <th>Sold On</th>
                  </tr>
                </thead>
                <tbody>
                  {sold.map((item, index) => (
                    <tr key={index}>
                      <td>{item.stockName}</td>
                      <td>{item.qty}</td>
                      <td>₹{item.price}</td>
                      <td>₹{item.avgBuyPrice}</td>
                      <td>₹{item.qty * item.price}</td>
                      <td style={{ color: item.pnl >= 0 ? "green" : "red" }}>
                        {item.pnl >= 0 ? "▲" : "▼"} ₹{item.pnl}
                      </td>
                      <td>{formatDateTime(item.soldOn)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="graph-container">
                <SoldSharesGraph soldData={sold} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SoldSharesPage;
