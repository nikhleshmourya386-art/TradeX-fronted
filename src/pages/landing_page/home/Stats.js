import React from 'react';
import './home.css';

function Awards() {
  return (
    <section className="trust-section">
      <div className="trust-left">
        <h1>Trust with confidence</h1>
        <h3>Customer-first always</h3>
        <p>
          That's why 1.6+ crore customers trust Zerodha with ~₹6 lakh crores of equity investments
          and contribute to 15% of daily retail exchange volumes in India.
        </p>

        <h2>No spam or gimmicks</h2>
        <p>
          No gimmicks, spam, "gamification", or annoying push notifications. High quality apps
          that you use at your pace, the way you like. <a href="#">Our philosophies.</a>
        </p>

        <h2>The TradeX universe</h2>
        <p>
          Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you
          tailored services.
        </p>
      </div>
      <div className="trust-right">
        <img src="media/image/simple.png" alt="Trust" />
      </div>
    </section>
  );
}

export default Awards;
