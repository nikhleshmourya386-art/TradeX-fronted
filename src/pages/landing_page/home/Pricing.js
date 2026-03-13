import React from 'react'
import './home.css';

function Pricing() {
  return (
    <div className="pricing-container">
      <div className="pricing-row">
        {/* Left column with heading & description */}
        <div className="col-4">
          <h1 className="heading-3">Unbeatable pricing</h1>
          <p>
            We pioneered the concept of discount broking and price transparency in India.
            Flat fees and no hidden charges.
          </p>
        </div>

        {/* Spacer column (empty) */}
        <div className="col-1"></div>

        {/* Right column with pricing details */}
        <div className="col-7 pricing-details">
          <div className="pricing-card">
            <h3>Equity Delivery</h3>
            <p className="price">₹0</p>
            <p>Absolutely free for equity delivery trades.</p>
          </div>

          <div className="pricing-card">
            <h3>Intraday & F&O</h3>
            <p className="price">₹20 or 0.03%</p>
            <p>Per executed order, whichever is lower.</p>
          </div>

          <div className="pricing-card">
            <h3>Mutual Funds</h3>
            <p className="price">₹0</p>
            <p>Invest in direct mutual funds with zero commission.</p>
          </div>
          <div className="pricing-card">
            <h3>Investment</h3>
            <p className="price">₹0</p>
            <p>Invest in direct mutual funds with zero commission.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;

