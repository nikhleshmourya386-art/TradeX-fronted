
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <h3>TradeX</h3>
          <p>Investing simplified. TradeX offers you seamless stock trading, mutual funds, and more at unbeatable pricing.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link><a href="#signup">Signup</a></Link></li>
            <li><Link><a href="#about">About</a></Link></li>
            <li><Link><a href="#product">Products</a></Link></li>
            <li><Link><a href="#pricing">Pricing</a></Link></li>
            <li><Link><a href="#support">Support</a></Link></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: support@tradex.com</p>
          <p>Phone: +91-9876543210</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 TradeX. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;


