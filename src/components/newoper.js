import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState({ id: '', name: '', email: '' });
  const [token, setToken] = useState('');
  const [amount, setAmount] = useState('');
  const [txId, setTxId] = useState('');
  const [total, setTotal] = useState('');
  const [items, setItems] = useState('');
  const [orders, setOrders] = useState([]);
  const [balance, setBalance] = useState(0);

  // Login simulation
  const handleLogin = async () => {
    const res = await axios.post('http://localhost:3000/api/auth/login', {
      email: 'student@example.com',
      password: '123456'
    });

    setToken(res.data.token);
    setUser({ ...res.data.user });
  };

  const fetchBalance = async () => {
    const res = await axios.get(`http://localhost:3000/api/funds/balance/${user.id}`);
    setBalance(res.data.balance);
  };

  const fetchOrders = async () => {
    const res = await axios.get(`http://localhost:3000/api/orders/user/${user.id}`);
    setOrders(res.data.orders);
  };

  const handleAddFunds = async () => {
    await axios.post('http://localhost:3000/api/funds/add', {
      userId: user.id,
      amount: Number(amount),
      method: 'UPI',
      transactionId: txId
    });
    fetchBalance();
  };

  const handleWithdrawFunds = async () => {
    try {
      await axios.post('http://localhost:3000/api/funds/withdraw', {
        userId: user.id,
        amount: Number(amount),
        method: 'Bank',
        transactionId: txId
      });
      fetchBalance();
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  const handlePlaceOrder = async () => {
    await axios.post('http://localhost:3000/api/orders/buy', {
      userId: user.id,
      items: items.split(','),
      totalAmount: Number(total)
    });
    fetchOrders();
    fetchBalance();
  };

  useEffect(() => {
    if (user.id) {
      fetchBalance();
      fetchOrders();
    }
  }, [user]);

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto', fontFamily: 'Arial' }}>
      <h2>🛍 HackFund Wallet & Orders (One Page App)</h2>
      
      {!user.id ? (
        <button onClick={handleLogin}>Login (student@example.com)</button>
      ) : (
        <>
          <p><strong>Logged in as:</strong> {user.name} ({user.email})</p>
          <p><strong>Wallet Balance:</strong> ₹{balance}</p>

          <h3>➕ Add / Withdraw Funds</h3>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
          <input value={txId} onChange={(e) => setTxId(e.target.value)} placeholder="Transaction ID" />
          <div>
            <button onClick={handleAddFunds}>Add Funds</button>
            <button onClick={handleWithdrawFunds}>Withdraw Funds</button>
          </div>

          <h3>🛒 Place Order</h3>
          <input value={items} onChange={(e) => setItems(e.target.value)} placeholder="Items (comma separated)" />
          <input value={total} onChange={(e) => setTotal(e.target.value)} placeholder="Total Amount" />
          <button onClick={handlePlaceOrder}>Place Order</button>

          <h3>📦 My Orders</h3>
          <ul>
            {orders.map((order) => (
              <li key={order._id}>
                <b>Items:</b> {order.items.join(', ')} | <b>Total:</b> ₹{order.totalAmount}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;
