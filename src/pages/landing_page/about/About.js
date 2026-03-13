import React from 'react';
//import './About.css';
import './About.css';
import Navbar from '../Navbar';
import Footer from '../Footer';

function About() {
  return (

    <>
    <Navbar/>

    <div className="about-container">
      <div className="about-content">
        <h1 className="about-heading">About TradeX</h1>
        <p className="about-description">
          TradeX is India's fastest-growing investment platform, dedicated to simplifying trading and investing for everyone. 
          With a user-friendly interface and unbeatable pricing, we empower investors across India.
        </p>
        
        <h2 className="about-subheading">Our Mission</h2>
        <p className="about-description">
          To democratize access to financial markets by offering high-quality, low-cost tools to every investor — beginner or professional.
        </p>

        <h2 className="about-subheading">Our Philosophy</h2>
        <p className="about-description">
          We believe in complete transparency, zero hidden fees, no pushy marketing, and long-term value creation for our clients.
        </p>

        <div className="about-stats">
          <div className="stat">
            <h3>15M+</h3>
            <p>Investors</p>
          </div>
          <div className="stat">
            <h3>₹6 Lakh Cr+</h3>
            <p>Assets Managed</p>
          </div>
          <div className="stat">
            <h3>10 Years+</h3>
            <p>Industry Experience</p>
          </div>
        </div>
      </div>

      <div className="about-image">
        <img src="media/image/about - image.png" alt="About TradeX" />
      </div>
    </div>


    <Footer/>
    </>
  );
}


export default About;
