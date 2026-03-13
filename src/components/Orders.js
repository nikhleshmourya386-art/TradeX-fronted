



// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./Orders.css";
// import Menu from "./Menu";
// import SoldSharesGraph from "./SoldSharesGraph";

// const Orders = () => {
//   const [sellQty, setSellQty] = useState({});
//   const [sellPrice, setSellPrice] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [holdings, setHoldings] = useState([]);
//   const [sold, setSold] = useState([]);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?._id;
//   const token = localStorage.getItem("token");

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/api/orders/user/${userId}`);
//       const allOrders = res.data.orders || [];

//       const buyMap = {};
//       const sellMap = {};
//       const sellList = [];

//       allOrders.forEach((order) => {
//         const name = order.stockName;

//         if (order.type === "buy") {
//           if (!buyMap[name]) {
//             buyMap[name] = {
//               stockName: name,
//               totalQty: 0,
//               totalCost: 0,
//               lastBuyTime: order.createdAt,
//               lastPrice: order.price,
//             };
//           }
//           buyMap[name].totalQty = order.qty;
//           buyMap[name].totalCost = order.qty * order.price;
//           buyMap[name].lastBuyTime = order.createdAt;
//           buyMap[name].lastPrice = order.price;
//         }

//         if (order.type === "sell") {
//           if (!sellMap[name]) sellMap[name] = 0;
//           sellMap[name] += order.qty;

//           const buy = buyMap[name];
//           const avgBuy = buy ? buy.totalCost / buy.totalQty : 0;
//           const pnl = (order.price - avgBuy) * order.qty;

//           sellList.push({
//             stockName: name,
//             qty: order.qty,
//             price: order.price,
//             soldOn: order.createdAt,
//             avgBuyPrice: avgBuy.toFixed(2),
//             pnl: pnl.toFixed(2),
//           });
//         }
//       });

//       const holdingsList = [];
//       Object.keys(buyMap).forEach((name) => {
//         const bought = buyMap[name].totalQty;
//         const soldQty = sellMap[name] || 0;
//         const remaining = bought - soldQty;

//         if (remaining > 0) {
//           holdingsList.push({
//             stockName: name,
//             qty: remaining,
//             price: buyMap[name].lastPrice,
//             lastBuyTime: buyMap[name].lastBuyTime,
//           });
//         }
//       });

//       setHoldings(holdingsList);
//       setSold(sellList);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!userId) {
//       setLoading(false);
//       return;
//     }
//     fetchOrders();
//   }, [userId]);

//   const handleSell = async (stockName) => {
//     const qty = Number(sellQty[stockName]);
//     const price = Number(sellPrice[stockName]);

//     if (!qty || !price || qty <= 0 || price <= 0) {
//       alert("⚠️ Please enter valid quantity and price.");
//       return;
//     }

//     const currentStock = holdings.find((h) => h.stockName === stockName);
//     if (!currentStock) {
//       alert(`❌ You do not hold any ${stockName}.`);
//       return;
//     }

//     if (qty > currentStock.qty) {
//       alert(`❌ You only have ${currentStock.qty} shares of ${stockName}. Cannot sell ${qty}.`);
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:3000/api/orders/sell",
//         {
//           userId,
//           stockName,
//           qty,
//           price,
//           type: "sell",
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       alert(`✅ Sold ${qty} of ${stockName} at ₹${price} = ₹${qty * price}`);
//       fetchOrders();
//     } catch (error) {
//       console.error("Sell failed:", error.response?.data || error.message);
//       alert("❌ Sell failed.");
//     }
//   };

//   const formatDateTime = (date) => {
//     if (!date) return "--";
//     return new Date(date).toLocaleString();
//   };

//   if (loading) return <p className="loading">Loading orders...</p>;

//   return (
//     <>
//       <Menu />
//       <div className="orders-container">
//         <Link to="/dashboard" className="back-btn">⬅ Back to Dashboard</Link>

//         <div className="section">
//           <h2 className="section-title">🟢 Your Holdings</h2>
//           {holdings.length === 0 ? (
//             <p className="empty-msg">No holdings available.</p>
//           ) : (
//             <table className="styled-table">
//               <thead>
//                 <tr>
//                   <th>Stock</th>
//                   <th>Remaining Qty</th>
//                   <th>Price</th>
//                   <th>Last Buy Time</th>
//                   <th>Sell</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {holdings.map((order, index) => (
//                   <tr key={index}>
//                     <td>{order.stockName}</td>
//                     <td>{order.qty}</td>
//                     <td>₹{order.price}</td>
//                     <td>{formatDateTime(order.lastBuyTime)}</td>
//                     <td>
//                       <div className="sell-inputs">
//                         <input
//                           type="number"
//                           placeholder="Qty"
//                           min="1"
//                           onChange={(e) =>
//                             setSellQty({ ...sellQty, [order.stockName]: e.target.value })
//                           }
//                         />
//                         <input
//                           type="number"
//                           placeholder="Price"
//                           step="0.1"
//                           onChange={(e) =>
//                             setSellPrice({ ...sellPrice, [order.stockName]: e.target.value })
//                           }
//                         />
//                         <button className="sell-btn" onClick={() => handleSell(order.stockName)}>
//                           Sell
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>

//         <div className="section">
//           <h2 className="section-title">🔴 Sold Shares (Detailed)</h2>
//           {sold.length === 0 ? (
//             <p className="empty-msg">No shares sold yet.</p>
//           ) : (
//             <>
//               <table className="styled-table">
//                 <thead>
//                   <tr>
//                     <th>Stock</th>
//                     <th>Qty</th>
//                     <th>Sell Price</th>
//                     <th>Avg Buy Price</th>
//                     <th>Total</th>
//                     <th>Profit/Loss</th>
//                     <th>Sold On</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {sold.map((item, index) => (
//                     <tr key={index}>
//                       <td>{item.stockName}</td>
//                       <td>{item.qty}</td>
//                       <td>₹{item.price}</td>
//                       <td>₹{item.avgBuyPrice}</td>
//                       <td>₹{item.qty * item.price}</td>
//                       <td style={{ color: item.pnl >= 0 ? "green" : "red" }}>
//                         {item.pnl >= 0 ? "▲" : "▼"} ₹{item.pnl}
//                       </td>
//                       <td>{formatDateTime(item.soldOn)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               <div className="graph-container">
//                 <SoldSharesGraph soldData={sold} />
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Orders;


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./Orders.css";
// import Menu from "./Menu";

// const Orders = () => {
//   const [sellQty, setSellQty] = useState({});
//   const [sellPrice, setSellPrice] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [holdings, setHoldings] = useState([]);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?._id;
//   const token = localStorage.getItem("token");

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/api/orders/user/${userId}`);
//       const allOrders = res.data.orders || [];

//       const buyMap = {};
//       const sellMap = {};

//       allOrders.forEach((order) => {
//         const name = order.stockName;

//         if (order.type === "buy") {
//           if (!buyMap[name]) {
//             buyMap[name] = {
//               stockName: name,
//               totalQty: 0,
//               totalCost: 0,
//               lastBuyTime: order.createdAt,
//               lastPrice: order.price,
//             };
//           }
//           buyMap[name].totalQty = order.qty;
//           buyMap[name].totalCost = order.qty * order.price;
//           buyMap[name].lastBuyTime = order.createdAt;
//           buyMap[name].lastPrice = order.price;
//         }

//         if (order.type === "sell") {
//           if (!sellMap[name]) sellMap[name] = 0;
//           sellMap[name] += order.qty;
//         }
//       });

//       const holdingsList = [];
//       Object.keys(buyMap).forEach((name) => {
//         const bought = buyMap[name].totalQty;
//         const soldQty = sellMap[name] || 0;
//         const remaining = bought - soldQty;

//         if (remaining > 0) {
//           holdingsList.push({
//             stockName: name,
//             qty: remaining,
//             price: buyMap[name].lastPrice,
//             lastBuyTime: buyMap[name].lastBuyTime,
//           });
//         }
//       });

//       setHoldings(holdingsList);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!userId) {
//       setLoading(false);
//       return;
//     }
//     fetchOrders();
//   }, [userId]);

//   const handleSell = async (stockName) => {
//     const qty = Number(sellQty[stockName]);
//     const price = Number(sellPrice[stockName]);

//     if (!qty || !price || qty <= 0 || price <= 0) {
//       alert("⚠️ Please enter valid quantity and price.");
//       return;
//     }

//     const currentStock = holdings.find((h) => h.stockName === stockName);
//     if (!currentStock) {
//       alert(`❌ You do not hold any ${stockName}.`);
//       return;
//     }

//     if (qty > currentStock.qty) {
//       alert(`❌ You only have ${currentStock.qty} shares of ${stockName}. Cannot sell ${qty}.`);
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:3000/api/orders/sell",
//         {
//           userId,
//           stockName,
//           qty,
//           price,
//           type: "sell",
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       alert(`✅ Sold ${qty} of ${stockName} at ₹${price} = ₹${qty * price}`);
//       fetchOrders();
//     } catch (error) {
//       console.error("Sell failed:", error.response?.data || error.message);
//       alert("❌ Sell failed.");
//     }
//   };

//   const formatDateTime = (date) => {
//     if (!date) return "--";
//     return new Date(date).toLocaleString();
//   };

//   if (loading) return <p className="loading">Loading orders...</p>;

//   return (
//     <>
//       <Menu />
//       <div className="orders-container">
//         <Link to="/dashboard" className="back-btn">⬅ Back to Dashboard</Link>

//         <div className="section">
//           <h2 className="section-title">🟢 Your Holdings</h2>
//           {holdings.length === 0 ? (
//             <p className="empty-msg">No holdings available.</p>
//           ) : (
//             <table className="styled-table">
//               <thead>
//                 <tr>
//                   <th>Stock</th>
//                   <th>Remaining Qty</th>
//                   <th>Price</th>
//                   <th>Last Buy Time</th>
//                   <th>Sell</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {holdings.map((order, index) => (
//                   <tr key={index}>
//                     <td>{order.stockName}</td>
//                     <td>{order.qty}</td>
//                     <td>₹{order.price}</td>
//                     <td>{formatDateTime(order.lastBuyTime)}</td>
//                     <td>
//                       <div className="sell-inputs">
//                         <input
//                           type="number"
//                           placeholder="Qty"
//                           min="1"
//                           onChange={(e) =>
//                             setSellQty({ ...sellQty, [order.stockName]: e.target.value })
//                           }
//                         />
//                         <input
//                           type="number"
//                           placeholder="Price"
//                           step="0.1"
//                           onChange={(e) =>
//                             setSellPrice({ ...sellPrice, [order.stockName]: e.target.value })
//                           }
//                         />
//                         <button className="sell-btn" onClick={() => handleSell(order.stockName)}>
//                           Sell
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Orders;



// src/components/Orders.jsx

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./Orders.css";
// import Menu from "./Menu";
// import HoldingsPieChart from "./HoldingsPieChart"; // ⬅️ New Pie Chart

// const Orders = () => {
//   const [sellQty, setSellQty] = useState({});
//   const [sellPrice, setSellPrice] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [holdings, setHoldings] = useState([]);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?._id;
//   const token = localStorage.getItem("token");

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/api/orders/user/${userId}`);
//       const allOrders = res.data.orders || [];

//       const buyMap = {};
//       const sellMap = {};

//       allOrders.forEach((order) => {
//         const name = order.stockName;

//         if (order.type === "buy") {
//           if (!buyMap[name]) {
//             buyMap[name] = {
//               stockName: name,
//               totalQty: 0,
//               totalCost: 0,
//               lastBuyTime: order.createdAt,
//               lastPrice: order.price,
//             };
//           }
//           buyMap[name].totalQty = order.qty;
//           buyMap[name].totalCost = order.qty * order.price;
//           buyMap[name].lastBuyTime = order.createdAt;
//           buyMap[name].lastPrice = order.price;
//         }

//         if (order.type === "sell") {
//           if (!sellMap[name]) sellMap[name] = 0;
//           sellMap[name] += order.qty;
//         }
//       });

//       const holdingsList = [];
//       Object.keys(buyMap).forEach((name) => {
//         const bought = buyMap[name].totalQty;
//         console.log(bought,"bought")
//         const soldQty = sellMap[name] || 0;
//         console.log(soldQty,"sold")
//         // const remaining = bought - soldQty;
//         const remaining = bought - soldQty;
//         //  console.log(remaining,"remiANING")
//         if (remaining > 0) {
//           holdingsList.push({
//             stockName: name,
//             qty: remaining,
//             price: buyMap[name].lastPrice,
//             lastBuyTime: buyMap[name].lastBuyTime,
//           });
//         }
//       });

//       setHoldings(holdingsList);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!userId) {
//       setLoading(false);
//       return;
//     }
//     fetchOrders();
//   }, [userId]);

//   const handleSell = async (stockName) => {
//     const qty = Number(sellQty[stockName]);
//     const price = Number(sellPrice[stockName]);
//     console.log(qty,price,"quanty,price")
//     if (!qty || !price || qty <= 0 || price <= 0) {
//       alert("⚠️ Please enter valid quantity and price.");
//       return;
//     }

//     const currentStock = holdings.find((h) => h.stockName === stockName);
//     if (!currentStock) {
//       alert(`❌ You do not hold any ${stockName}.`);
//       return;
//     }

//     if (qty > currentStock.qty) {
//       alert(`❌ You only have ${currentStock.qty} shares of ${stockName}. Cannot sell ${qty}.`);
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:3000/api/orders/sell",
//         {
//           userId,
//           stockName,
//           qty,
//           price,
//           type: "sell",
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       alert(`✅ Sold ${qty} of ${stockName} at ₹${price} = ₹${qty * price}`);
//       fetchOrders();
//     } catch (error) {
//       console.error("Sell failed:", error.response?.data || error.message);
//       alert("❌ Sell failed.");
//     }
//   };

//   const formatDateTime = (date) => {
//     if (!date) return "--";
//     return new Date(date).toLocaleString();
//   };

//   if (loading) return <p className="loading">Loading orders...</p>;

//   return (
//     <>
//       <Menu /> 
//       <div className="orders-container">
//         <Link to="/dashboard" className="back-btn">⬅ Back to Dashboard</Link>

//         <div className="section">
//           <h2 className="section-title">🟢 Your Holdings</h2>
//           {holdings.length === 0 ? (
//             <p className="empty-msg">No holdings available.</p>
//           ) : (
//             <>
//               <table className="styled-table">
//                 <thead>
//                   <tr>
//                     <th>Stock</th>
//                     <th>Remaining Qty</th>
//                     <th>Price</th>
//                     <th>Last Buy Time</th>
//                     <th>Sell</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {holdings.map((order, index) => (
//                     <tr key={index}>
//                       <td>{order.stockName}</td>
//                       <td>{order.qty}</td>
//                       <td>₹{order.price}</td>
//                       <td>{formatDateTime(order.lastBuyTime)}</td>
//                       <td>
//                         <div className="sell-inputs">
//                           <input
//                             type="number"
//                             placeholder="Qty"
//                             min="1"
//                             onChange={(e) =>
//                               setSellQty({ ...sellQty, [order.stockName]: e.target.value })
//                             }
//                           />
//                           <input
//                             type="number"
//                             placeholder="Price"
//                             step="0.1"
//                             onChange={(e) =>
//                               setSellPrice({ ...sellPrice, [order.stockName]: e.target.value })
//                             }
//                           />
//                           <button className="sell-btn" onClick={() => handleSell(order.stockName)}>
//                             Sell
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               <div className="section">
//                 <h2 className="section-title">📊 Holdings Distribution</h2>
//                 <div className="graph-container">
//                   <HoldingsPieChart holdings={holdings} />
//                 </div>``
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Orders;





// //NEW ADDDING THE CONNTENT
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./Orders.css";
// import Menu from "./Menu";
// import HoldingsPieChart from "./HoldingsPieChart";

// const Orders = () => {
//   const [sellQty, setSellQty] = useState({});
//   const [sellPrice, setSellPrice] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [holdings, setHoldings] = useState([]);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?._id;
//   const token = localStorage.getItem("token");

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/api/orders/user/${userId}`);
//       const allOrders = res.data.orders || [];

//       const buyMap = {};
//       const sellMap = {};

//       allOrders.forEach((order) => {
//         const name = order.stockName;

//         if (order.type === "buy") {
//           if (!buyMap[name]) {
//             buyMap[name] = {
//               stockName: name,
//               totalQty: 0,
//               totalCost: 0,
//               lastBuyTime: order.createdAt,
//             };
//           }
//           buyMap[name].totalQty += order.qty;
//           buyMap[name].totalCost += order.qty * order.price;
//           buyMap[name].lastBuyTime = order.createdAt;
//         }

//         if (order.type === "sell") {
//           if (!sellMap[name]) sellMap[name] = 0;
//           sellMap[name] += order.qty;
//         }
//       });

//       const holdingsList = [];
//       Object.keys(buyMap).forEach((name) => {
//         const bought = buyMap[name].totalQty;
//         const sold = sellMap[name] || 0;
//         const remaining = bought - sold;

//         if (remaining > 0) {
//           const avgPrice = buyMap[name].totalCost / bought;

//           holdingsList.push({
//             stockName: name,
//             qty: remaining,
//             price: avgPrice,
//             lastBuyTime: buyMap[name].lastBuyTime,
//           });
//         }
//       });

//       setHoldings(holdingsList);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!userId) {
//       setLoading(false);
//       return;
//     }

//     fetchOrders();

//     const updateListener = () => fetchOrders();
//     window.addEventListener("ordersUpdated", updateListener);

//     return () => window.removeEventListener("ordersUpdated", updateListener);
//   }, [userId]);

//   const handleSell = async (stockName) => {
//     const qty = Number(sellQty[stockName]);
//     const price = Number(sellPrice[stockName]);

//     if (!qty || !price || qty <= 0 || price <= 0) {
//       alert("⚠️ Please enter valid quantity and price.");
//       return;
//     }

//     const currentStock = holdings.find((h) => h.stockName === stockName);
//     if (!currentStock) {
//       alert(`❌ You do not hold any ${stockName}.`);
//       return;
//     }

//     if (qty > currentStock.qty) {
//       alert(`❌ You only have ${currentStock.qty} shares of ${stockName}. Cannot sell ${qty}.`);
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:3000/api/orders/sell",
//         {
//           userId,
//           stockName,
//           qty,
//           price,
//           type: "sell",
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       alert(`✅ Sold ${qty} of ${stockName} at ₹${price} = ₹${qty * price}`);
//       fetchOrders();
//     } catch (error) {
//       console.error("Sell failed:", error.response?.data || error.message);
//       alert("❌ Sell failed.");
//     }
//   };

//   const formatDateTime = (date) => {
//     if (!date) return "--";
//     return new Date(date).toLocaleString();
//   };

//   if (loading) return <p className="loading">Loading orders...</p>;

//   return (
//    <>
//     <Menu />
//     <div className="orders-container">
//       <Link to="/dashboard" className="back-btn" >⬅ Back to Dashboard</Link>

//       <div className="section">
//         <h2 className="section-title">🟢 Your Holdings</h2>
//         {holdings.length === 0 ? (
//           <p className="empty-msg">No holdings available.</p>
//         ) : (
//           <>
//             <div className="table-container">
//               <table className="styled-table modern-table">
//                 <thead>
//                   <tr>
//                     <th >📈 Stock</th>
//                     <th>📦 Qty</th>
//                     <th>💰 Avg Price</th>
//                     <th>🕒 Buy Time</th>
//                     <th>💼 Sell</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {holdings.map((order, index) => (
//                     <tr key={index}>
//                       <td>{order.stockName}</td>
//                       <td>{order.qty}</td>
//                       <td>₹{order.price.toFixed(2)}</td>
//                       <td>{formatDateTime(order.lastBuyTime)}</td>
//                       <td>
//                         <div className="sell-form">
//                           <input
//                             type="number"
//                             placeholder="Qty"
//                             min="1"
//                             className="sell-input"
//                             onChange={(e) =>
//                               setSellQty({ ...sellQty, [order.stockName]: e.target.value })
//                             }
//                           />
//                           <input
//                             type="number"
//                             placeholder="Price"
//                             step="0.1"
//                             className="sell-input"
//                             onChange={(e) =>
//                               setSellPrice({ ...sellPrice, [order.stockName]: e.target.value })
//                             }
//                           />
//                           <button className="sell-btn modern-sell-btn" onClick={() => handleSell(order.stockName)}>
//                             Sell
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="section">
//               <h2 className="section-title">📊 Holdings Distribution</h2>
//               <div className="graph-container">
//                 <HoldingsPieChart holdings={holdings} />
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   </>
//   );
// };

// export default Orders;





// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./Orders.css";
// import Menu from "./Menu";
// import HoldingsPieChart from "./HoldingsPieChart";

// const Orders = () => {
//   const [sellQty, setSellQty] = useState({});
//   const [sellPrice, setSellPrice] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [holdings, setHoldings] = useState([]);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?._id;
//   const token = localStorage.getItem("token");

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/api/orders/user/${userId}`);
//       const allOrders = res.data.orders || [];

//       const buyOrders = allOrders.filter(order => order.type === "buy");

//       const sellMap = {};
//       allOrders
//         .filter(order => order.type === "sell")
//         .forEach(order => {
//           const key = `${order.stockName}-${order.price}`;
//           if (!sellMap[key]) sellMap[key] = 0;
//           sellMap[key] += order.qty;
//         });

//       const updatedHoldings = [];

//       buyOrders.forEach(order => {
//         const key = `${order.stockName}-${order.price}`;
//         const soldQty = sellMap[key] || 0;
//         const remainingQty = order.qty - soldQty;

//         if (remainingQty > 0) {
//           updatedHoldings.push({
//             stockName: order.stockName,
//             qty: remainingQty,
//             price: order.price,
//             lastBuyTime: order.createdAt,
//           });
//         }
//       });

//       setHoldings(updatedHoldings);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!userId) {
//       setLoading(false);
//       return;
//     }

//     fetchOrders();
//     const updateListener = () => fetchOrders();
//     window.addEventListener("ordersUpdated", updateListener);
//     return () => window.removeEventListener("ordersUpdated", updateListener);
//   }, [userId]);

//   const handleSell = async (stockName, price) => {
//     const key = `${stockName}-${price}`;
//     const qty = Number(sellQty[key]);
//     const sellAtPrice = Number(sellPrice[key]);

//     if (!qty || !sellAtPrice || qty <= 0 || sellAtPrice <= 0) {
//       alert("⚠️ Please enter valid quantity and price.");
//       return;
//     }

//     const currentStock = holdings.find(h => h.stockName === stockName && h.price === price);
//     if (!currentStock) {
//       alert(`❌ You do not hold this stock.`);
//       return;
//     }

//     if (qty > currentStock.qty) {
//       alert(`❌ You only have ${currentStock.qty} shares at ₹${price}.`);
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:3000/api/orders/sell",
//         {
//           userId,
//           stockName,
//           qty,
//           price: sellAtPrice,
//           type: "sell",
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       alert(`✅ Sold ${qty} of ${stockName} at ₹${sellAtPrice} = ₹${qty * sellAtPrice}`);
//       fetchOrders();
//     } catch (error) {
//       console.error("Sell failed:", error.response?.data || error.message);
//       alert("❌ Sell failed.");
//     }
//   };

//   const formatDateTime = (date) => {
//     if (!date) return "--";
//     return new Date(date).toLocaleString();
//   };

//   if (loading) return <p className="loading">Loading orders...</p>;

//   return (
//     <>
//       <Menu />
//       <div className="orders-container">
//         <Link to="/dashboard" className="back-btn">⬅ Back to Dashboard</Link>

//         <div className="section">
//           <h2 className="section-title">🟢 Your Holdings (Detailed Lots)</h2>
//           {holdings.length === 0 ? (
//             <p className="empty-msg">No holdings available.</p>
//           ) : (
//             <>
//               <table className="styled-table">
//                 <thead>
//                   <tr>
//                     <th>Stock</th>
//                     <th>Qty Left</th>
//                     <th>Buy Price</th>
//                     <th>Last Buy Time</th>
//                     <th>Sell</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {holdings.map((order, index) => {
//                     const key = `${order.stockName}-${order.price}`;
//                     return (
//                       <tr key={index}>
//                         <td>{order.stockName}</td>
//                         <td>{order.qty}</td>
//                         <td>₹{order.price.toFixed(2)}</td>
//                         <td>{formatDateTime(order.lastBuyTime)}</td>
//                         <td>
//                           <div className="sell-inputs">
//                             <input
//                               type="number"
//                               placeholder="Qty"
//                               min="1"
//                               onChange={(e) =>
//                                 setSellQty({ ...sellQty, [key]: e.target.value })
//                               }
//                             />
//                             <input
//                               type="number"
//                               placeholder="Price"
//                               step="0.1"
//                               onChange={(e) =>
//                                 setSellPrice({ ...sellPrice, [key]: e.target.value })
//                               }
//                             />
//                             <button className="sell-btn" onClick={() => handleSell(order.stockName, order.price)}>
//                               Sell
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>

//               <div className="section">
//                 <h2 className="section-title">📊 Holdings Distribution</h2>
//                 <div className="graph-container">
//                   <HoldingsPieChart holdings={holdings} />
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Orders;




import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Orders.css";
import Menu from "./Menu";
import HoldingsPieChart from "./HoldingsPieChart";

const Orders = () => {
  const [sellQty, setSellQty] = useState({});
  const [sellPrice, setSellPrice] = useState({});
  const [loading, setLoading] = useState(true);
  const [holdings, setHoldings] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/orders/user/${userId}`);
      const allOrders = res.data.orders || [];

      const buyOrders = allOrders
        .filter(order => order.type === "buy")
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // FIFO

      const sellOrders = allOrders
        .filter(order => order.type === "sell")
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      const updatedHoldings = [];

      // Clone buyOrders to allow qty mutation
      const buyLots = buyOrders.map(order => ({
        stockName: order.stockName,
        qty: order.qty,
        price: order.price,
        createdAt: order.createdAt,
      }));

      // Deduct each sell from buy lots (FIFO)
      sellOrders.forEach(sell => {
        let remainingToSell = sell.qty;

        for (let i = 0; i < buyLots.length && remainingToSell > 0; i++) {
          const lot = buyLots[i];
          if (lot.stockName === sell.stockName && lot.qty > 0) {
            const deductQty = Math.min(lot.qty, remainingToSell);
            lot.qty -= deductQty;
            remainingToSell -= deductQty;
          }
        }
      });

      // Remaining lots become current holdings
      buyLots.forEach(lot => {
        if (lot.qty > 0) {
          updatedHoldings.push({
            stockName: lot.stockName,
            qty: lot.qty,
            price: lot.price,
            lastBuyTime: lot.createdAt,
          });
        }
      });

      setHoldings(updatedHoldings);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    fetchOrders();

    const updateListener = () => fetchOrders();
    window.addEventListener("ordersUpdated", updateListener);
    return () => window.removeEventListener("ordersUpdated", updateListener);
  }, [userId]);

  const handleSell = async (stockName, price) => {
    const key = `${stockName}-${price}`;
    const qty = Number(sellQty[key]);
    const sellAtPrice = Number(sellPrice[key]);

    if (!qty || !sellAtPrice || qty <= 0 || sellAtPrice <= 0) {
      alert("⚠️ Please enter valid quantity and price.");
      return;
    }

    const currentStock = holdings.find(h => h.stockName === stockName && h.price === price);
    if (!currentStock) {
      alert(`❌ You do not hold this stock.`);
      return;
    }

    if (qty > currentStock.qty) {
      alert(`❌ You only have ${currentStock.qty} shares at ₹${price}.`);
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/orders/sell",
        {
          userId,
          stockName,
          qty,
          price: sellAtPrice,
          type: "sell",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert(`✅ Sold ${qty} of ${stockName} at ₹${sellAtPrice} = ₹${qty * sellAtPrice}`);
      window.dispatchEvent(new Event("ordersUpdated"));
    } catch (error) {
      console.error("Sell failed:", error.response?.data || error.message);
      alert("❌ Sell failed.");
    }
  };

  const formatDateTime = (date) => {
    if (!date) return "--";
    return new Date(date).toLocaleString();
  };

  if (loading) return <p className="loading">Loading orders...</p>;

  return (
    <>
      <Menu />
      <div className="orders-container">
        <Link to="/dashboard" className="back-btn">⬅ Back to Dashboard</Link>

        <div className="section">
          <h2 className="section-title">🟢 Your Holdings (Detailed Lots)</h2>
          {holdings.length === 0 ? (
            <p className="empty-msg">No holdings available.</p>
          ) : (
            <>
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Stock</th>
                    <th>Qty Left</th>
                    <th>Buy Price</th>
                    <th>Last Buy Time</th>
                    <th>Sell</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((order, index) => {
                    const key = `${order.stockName}-${order.price}`;
                    return (
                      <tr key={index}>
                        <td>{order.stockName}</td>
                        <td>{order.qty}</td>
                        <td>₹{order.price.toFixed(2)}</td>
                        <td>{formatDateTime(order.lastBuyTime)}</td>
                        <td>
                          <div className="sell-inputs">
                            <input
                              type="number"
                              placeholder="Qty"
                              min="1"
                              onChange={(e) =>
                                setSellQty({ ...sellQty, [key]: e.target.value })
                              }
                            />
                            <input
                              type="number"
                              placeholder="Price"
                              step="0.1"
                              onChange={(e) =>
                                setSellPrice({ ...sellPrice, [key]: e.target.value })
                              }
                            />
                            <button
                              className="sell-btn"
                              onClick={() => handleSell(order.stockName, order.price)}
                            >
                              Sell
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="section">
                <h2 className="section-title">📊 Holdings Distribution</h2>
                <div className="graph-container">
                  <HoldingsPieChart holdings={holdings} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;


