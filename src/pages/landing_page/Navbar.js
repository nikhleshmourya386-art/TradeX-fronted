import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar"
    style={{
      // backgroundColor: "#fff",
      borderBottom: "1px solid #ccc",
      padding: "10px 20px",
      position: "sticky",     // Sticky behavior
      top: "0",               // Stick to top
      zIndex: 1000,           // Stay above other content
     color:"black",
     background:"white",
     color:"black",
     

    }}
    >
      <div className="navbar-container">
        <div className="navbar-logo" >
          <Link to="/">TradeX</Link>
        </div>
        <ul className="navbar-menu" >
          <li><Link to="/register">Signup</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link  to="/product">Products</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/support">Support</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
