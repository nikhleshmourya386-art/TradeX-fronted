
// import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// import GeneralContext from "./GeneralContext";
// import "./BuyActionWindow.css";

// const BuyActionWindow = ({ userId, stockName }) => {
//   const [stockQuantity, setStockQuantity] = useState(1);
//   const [stockPrice, setStockPrice] = useState(0.0);
//   const [balance, setBalance] = useState(0); // ✅ New: balance state
//   const { closeBuyWindow } = useContext(GeneralContext);

//   const resolvedUserId = userId || JSON.parse(localStorage.getItem("user"))?._id;
//  const [formData, setFormData] = useState({
//     amount:stockPrice ,
//     accountNumber: 23423534,
//     ifsc: 244,
//     paymentMode: 'Bank Transfer', // ✅ renamed from `mode`
//     remarks: '',
//   });
//   useEffect(() => {
//     const fetchBalance = async () => {
//       try {
//         if (!resolvedUserId) return;

//         const res = await fetch(`http://localhost:3000/api/funds/balance/${resolvedUserId}`);
//         const data = await res.json();
//         setBalance(data.balance || 0);
//       } catch (err) {
//         console.error("❌ Failed to fetch balance:", err);
//       }
//     };

//     fetchBalance();

//     const updateListener = () => fetchBalance(); // Refresh balance on events
//     window.addEventListener("balanceUpdated", updateListener);

//     return () => window.removeEventListener("balanceUpdated", updateListener);
//   }, [resolvedUserId]);

//   const handleBuyClick = async () => {
//     const token = localStorage.getItem("token");

//     if (!resolvedUserId) {
//       alert("❌ User ID not found. Please login again.");
//       return;
//     }

//     if (stockQuantity <= 0 || stockPrice <= 0) {
//       alert("❌ Please enter valid quantity and price.");
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:3000/api/orders/buy",
//         {
//           userId: resolvedUserId,
//           stockName,
//           qty: stockQuantity,
//           price: stockPrice,
//           type: "buy",
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       window.dispatchEvent(new Event("balanceUpdated")); // ✅ Trigger refresh
//       alert(
//         `✅ Purchased ${stockQuantity} share(s) of ${stockName} at ₹${stockPrice} each.`
//       );
//       closeBuyWindow();
//     } catch (error) {
//       console.error("❌ Buy failed:", error.response?.data || error.message);
//       alert("❌ Buy order failed.");
//     }


// // withdraw code


//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user || !user._id) return alert("User not found. Please login again.");

//     try {
//       const transactionId = "TXN" + Date.now(); // ✅ Generate transaction ID

//       const response = await fetch("http://localhost:3000/api/funds/withdraw", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//        body: JSON.stringify({
//     userId: resolvedUserId,
//     amount: totalCost,
//     transactionId,
//     // Optional — leave these out if you rely on defaults:
//     // accountNumber: "",
//     // ifsc: "",
//     // paymentMode: "",
//   }),
//       });
      
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error("Withdraw response error:", errorText);
//         return alert("❌ Error: " + errorText);
//       }

//       const data = await response.json();
//       alert("✅ Withdrawal successful!");

//     } catch (err) {
//       console.error("Withdraw error:", err);
//       alert("❌ Withdraw failed. Check console.");
//     }


//   };

//   const totalCost = (stockPrice * stockQuantity).toFixed(2);

//   return (
//     <div className="container" id="buy-window" draggable="true">
//       <div className="regular-order">
//         <p style={{ marginBottom: "10px", fontWeight: "bold", color: "green" }}>
//           🏦 Available Balance: ₹{balance.toFixed(2)}
//         </p>

//         <div className="inputs">
//           <fieldset>
//             <legend>Qty.</legend>
//             <input
//               type="number"
//               name="qty"
//               id="qty"
//               min="1"
//               onChange={(e) => setStockQuantity(Number(e.target.value))}
//               value={stockQuantity}
//               required
//             />
//           </fieldset>
//           <fieldset>
//             <legend>Price</legend>
//             <input
//               type="number"
//               name="price"
//               id="price"
//               step="0.05"
//               onChange={(e) => setStockPrice(Number(e.target.value))}
//               value={stockPrice}
//               required
//             />
//           </fieldset>
//         </div>
//       </div>

//       <div className="buttons">
//         <span>💸 Margin required: ₹{totalCost}</span>
//         <div>
//           <Link className="btn btn-blue" onClick={handleBuyClick}>
//             Buy
//           </Link>
//           <Link to="" className="btn btn-blue" onClick={closeBuyWindow}>
//             Cancel
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuyActionWindow;







//ADDING NEW FUNCTIONALITY FOR TESTING 
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ userId, stockName }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [balance, setBalance] = useState(0);
  const { closeBuyWindow } = useContext(GeneralContext);

  const resolvedUserId = userId || JSON.parse(localStorage.getItem("user"))?._id;
  const token = localStorage.getItem("token");

  const totalCost = stockPrice * stockQuantity;

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (!resolvedUserId) return;
        const res = await fetch(`http://localhost:3000/api/funds/balance/${resolvedUserId}`);
        const data = await res.json();
        setBalance(data.balance || 0);
      } catch (err) {
        console.error("❌ Failed to fetch balance:", err);
      }
    };

    fetchBalance();
    const updateListener = () => fetchBalance();
    window.addEventListener("balanceUpdated", updateListener);
    return () => window.removeEventListener("balanceUpdated", updateListener);
  }, [resolvedUserId]);
const handleBuyClick = async () => {
  if (!resolvedUserId) {
    alert("❌ User ID not found. Please login again.");
    return;
  }

  if (stockQuantity <= 0 || stockPrice <= 0) {
    alert("❌ Please enter valid quantity and price.");
    return;
  }

  if (totalCost > balance) {
    alert("❌ Insufficient balance. Please add funds.");
    return;
  }

  try {
    const transactionId = "TXN" + Date.now();

    // ✅ Send all required fields
    const withdrawResponse = await fetch("http://localhost:3000/api/funds/withdraw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: resolvedUserId,
        amount: totalCost,
        transactionId,
        accountNumber: "0000000000", // dummy default
        ifsc: "SBIN0000000",         // dummy default
        paymentMode: "Bank Transfer" // default mode
      }),
    });

    if (!withdrawResponse.ok) {
      const errorText = await withdrawResponse.text();
      console.error("Withdraw response error:", errorText);
      return alert("❌ Withdrawal failed: " + errorText);
    }

    // ✅ Only place order if withdraw succeeded
    const token = localStorage.getItem("token");

    const orderRes = await axios.post(
      "http://localhost:3000/api/orders/buy",
      {
        userId: resolvedUserId,
        stockName,
        qty: stockQuantity,
        price: stockPrice,
        type: "buy",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (orderRes.status === 200) {
      window.dispatchEvent(new Event("balanceUpdated"));
      alert(`✅ Purchased ${stockQuantity} share(s) of ${stockName} at ₹${stockPrice} each.`);
      closeBuyWindow();
    } else {
      alert("❌ Buy order failed.");
    }
  } catch (err) {
    console.error("❌ Transaction error:", err);
    alert("❌ Transaction failed. Check console.");
  }
};

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <p style={{ marginBottom: "10px", fontWeight: "bold", color: "green" }}>
          🏦 Available Balance: ₹{balance.toFixed(2)}
        </p>

        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              min="1"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(Number(e.target.value))}
              required
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              step="0.05"
              value={stockPrice}
              onChange={(e) => setStockPrice(Number(e.target.value))}
              required
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>💸 Margin required: ₹{totalCost.toFixed(2)}</span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="" className="btn btn-blue" onClick={closeBuyWindow}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
