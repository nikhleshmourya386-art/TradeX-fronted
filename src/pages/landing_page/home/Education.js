
import React from 'react';
//import './Education.css';
import './home.css';

function Education() {
  return (
    <section className="education-section">
      <div className="education-container">
        <h2 className="education-title">Learn and Grow with TradeX</h2>
        <p className="education-description">
          Access free tutorials, webinars, and articles designed to help you make smarter investment decisions.
        </p>
        <div className="education-cards">
          <div className="education-card">
            <h3>Beginner's Guide</h3>
            <p>Step-by-step lessons to get you started in the world of trading and investing.</p>
          </div>
          <div className="education-card">
            <h3>Market Analysis</h3>
            <p>Learn how to analyze market trends and use technical tools effectively.</p>
          </div>
          <div className="education-card">
            <h3>Webinars & Workshops</h3>
            <p>Join live sessions with experts to sharpen your trading skills.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
