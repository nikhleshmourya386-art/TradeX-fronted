import React, { useState } from "react";
//import "./PricingPage.css";

import './Pricing.css'
import Navbar from "../Navbar";
import Footer from "../Footer";

function PricingPage() {
  const [activeTab, setActiveTab] = useState("equity");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (


    <>
    
    
    

<Navbar/>

    <div className="pricing-wrapper">
      <section className="pricing-section">
        <div className="pricing-container">
          {/* Charges Section */}
          <h1 className="pricing-title">Charges</h1>
          <p className="pricing-subtitle">List of all charges and taxes</p>

          <div className="pricing-grid">
            <div className="pricing-item">
              <div className="pricing-icon">₹0</div>
              <h3>Free equity delivery</h3>
              <p>
                All equity delivery investments (NSE, BSE), are absolutely free — ₹0 brokerage.
              </p>
            </div>
            <div className="pricing-item">
              <div className="pricing-icon">₹20</div>
              <h3>Intraday and F&O trades</h3>
              <p>
                Flat ₹20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.
              </p>
            </div>
            <div className="pricing-item">
              <div className="pricing-icon">₹0</div>
              <h3>Free direct MF</h3>
              <p>
                All direct mutual fund investments are absolutely free — ₹0 commissions & DP charges.
              </p>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="tabs-container">
            <div className="tabs">
              <button
                className={activeTab === "equity" ? "active" : ""}
                onClick={() => handleTabClick("equity")}
              >
                Equity
              </button>
              <button
                className={activeTab === "currency" ? "active" : ""}
                onClick={() => handleTabClick("currency")}
              >
                Currency
              </button>
              <button
                className={activeTab === "commodity" ? "active" : ""}
                onClick={() => handleTabClick("commodity")}
              >
                Commodity
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "equity" && (
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Equity delivery</th>
                      <th>Equity intraday</th>
                      <th>F&O - Futures</th>
                      <th>F&O - Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Brokerage</td>
                      <td>Zero Brokerage</td>
                      <td>0.03% or Rs. 20/executed order whichever is lower</td>
                      <td>0.03% or Rs. 20/executed order whichever is lower</td>
                      <td>Flat Rs. 20 per executed order</td>
                    </tr>
                    <tr>
                      <td>STT/CTT</td>
                      <td>0.1% on buy & sell</td>
                      <td>0.025% on the sell side</td>
                      <td>0.02% on the sell side</td>
                      <td>
                        • 0.125% of the intrinsic value on options bought & exercised<br />
                        • 0.1% on sell side (on premium)
                      </td>
                    </tr>
                    <tr>
                      <td>Transaction charges</td>
                      <td>
                        NSE: 0.00297% <br /> BSE: 0.00375%
                      </td>
                      <td>
                        NSE: 0.00297% <br /> BSE: 0.00375%
                      </td>
                      <td>
                        NSE: 0.00173% <br /> BSE: 0
                      </td>
                      <td>
                        NSE: 0.03503% (on premium) <br /> BSE: 0.0325% (on premium)
                      </td>
                    </tr>
                    <tr>
                      <td>GST</td>
                      <td>18% on (brokerage + SEBI charges + transaction charges)</td>
                      <td>18% on (brokerage + SEBI charges + transaction charges)</td>
                      <td>18% on (brokerage + SEBI charges + transaction charges)</td>
                      <td>18% on (brokerage + SEBI charges + transaction charges)</td>
                    </tr>
                  </tbody>
                </table>
              )}

              {activeTab === "currency" && (
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Currency Futures</th>
                      <th>Currency Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Brokerage</td>
                      <td>0.03% or Rs. 20/executed order whichever is lower</td>
                      <td>Flat Rs. 20 per executed order</td>
                    </tr>
                    <tr>
                      <td>STT/CTT</td>
                      <td>0.01% on the sell side</td>
                      <td>0.01% on sell side (on premium)</td>
                    </tr>
                    <tr>
                      <td>Transaction charges</td>
                      <td>NSE: 0.00145%</td>
                      <td>NSE: 0.018%</td>
                    </tr>
                    <tr>
                      <td>GST</td>
                      <td>18% on (brokerage + SEBI charges + transaction charges)</td>
                      <td>18% on (brokerage + SEBI charges + transaction charges)</td>
                    </tr>
                  </tbody>
                </table>
              )}

              {activeTab === "commodity" && (
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Commodity Futures</th>
                      <th>Commodity Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Brokerage</td>
                      <td>0.03% or Rs. 20/executed order whichever is lower</td>
                      <td>Flat Rs. 20 per executed order</td>
                    </tr>
                    <tr>
                      <td>STT/CTT</td>
                      <td>0.01% on the sell side</td>
                      <td>0.01% on sell side (on premium)</td>
                    </tr>
                    <tr>
                      <td>Transaction charges</td>
                      <td>MCX: 0.0025%</td>
                      <td>MCX: 0.015%</td>
                    </tr>
                    <tr>
                      <td>GST</td>
                      <td>18% on (brokerage + SEBI charges + transaction charges)</td>
                      <td>18% on (brokerage + SEBI charges + transaction charges)</td>
                    </tr>
                  </tbody>
                </table>
              )}
               {/* Charges Explained Section */}
          <div className="charges-explained">
            <h2>Charges Explained</h2>
            <p>
              Our brokerage and other charges are designed to be transparent and competitive.
              Here’s a quick overview:
            </p>
            <ul>
              <li>
                <strong>Brokerage:</strong> Fee charged by us for executing your trades. It varies by segment.
              </li>
              <li>
                <strong>STT/CTT:</strong> Securities Transaction Tax / Commodities Transaction Tax as per government rules.
              </li>
              <li>
                <strong>Transaction Charges:</strong> Fees collected by exchanges for processing trades.
              </li>
              <li>
                <strong>GST:</strong> Goods and Services Tax applied on total charges.
              </li>
            </ul>
          </div>
        </div>
        </div>

        </div>
      </section>
    </div>

    <Footer/>
    </>
  );
}

export default PricingPage;
