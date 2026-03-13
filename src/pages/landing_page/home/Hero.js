
import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';
function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-row">
        <img src="media/image/hero-image.png" alt="hero image" className="home-image" />
        <h1 className="heading">Invest in everything</h1>
        <p className="para">
          Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.
        </p>
        <Link className="button" to="/register">Signup Now</Link>
      </div>
    </div>
  );
}

export default Hero;


