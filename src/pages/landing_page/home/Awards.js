
import React from 'react';
import './home.css';

function Awards() {
  return (
    <div className="awards-container">
      <div className="awards-row">
        <div className="col-6">
          <img src="media/image/image-2.png" alt="no image" />
        </div>
        <div className="col-6">
          <h1 className="heading-2">Trust with confidence</h1>
          <h4 className="h-3">Customer-first always</h4>
          <p>
            That's why 1.6+ crore customers trust TradeX with ~ ₹6 lakh crores of equity investments
            and contribute to 15% of daily retail exchange volumes in India.
          </p>
          <h4 className="h-4">No spam or gimmicks</h4>
          <p>
            No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that
            you use at your pace, the way you like. Our philosophies.
          </p>
          <h4 className="h-5">The TradeX universe</h4>
          <p>
            Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you
            tailored services specific to your needs.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Awards;

