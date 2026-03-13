import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./Menu";
import {Link} from "react-router-dom";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/allPositions") // ✅ Make sure your backend has this
      .then((res) => setAllPositions(res.data))
      .catch((err) => console.error("Error fetching positions:", err));
  }, []);

  return (
    <>
  <Menu/>
    <Link to="/dashboard" className="btn">
                Back to Dashboard
              </Link>
      <h3 className="title">Positions ({allPositions.length})</h3>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.product || "-"}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg?.toFixed(2) ?? '0.00'}</td>
                  <td>{stock.price?.toFixed(2) ?? '0.00'}</td>
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
