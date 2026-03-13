
import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
//import "./ProductPage.css"; // Linked CSS file

import './products.css'

function ProductPage() {
  const products = [
    {
      img: "media/image/products-kite.png",
      alt: "Kite",
      title: "Kite",
      desc: "A sleek, fast, and powerful trading platform for modern investors. Kite provides advanced charting tools, lightning-fast execution, and an intuitive user interface, making investing seamless and efficient.",
    },
    {
      img: "media/image/products-console.png",
      alt: "Console",
      title: "Console",
      desc: "Advanced dashboard to track your portfolio, reports, and analytics. Console offers detailed insights into your investments, trade reports, and performance analysis, empowering you with in-depth data.",
    },
    {
      img: "media/image/products-coin.png",
      alt: "Coin",
      title: "Coin",
      desc: "Invest in direct mutual funds online with zero commission and complete transparency. Coin enables you to buy, sell, and manage mutual funds with ease, ensuring maximum savings and simplified investing.",
    },
    {
      img: "media/image/products-smallcase.png",
      alt: "Smallcase",
      title: "Smallcase",
      desc: "Curated baskets of stocks & ETFs for long-term investors with thematic investing. Smallcase helps investors diversify and invest in ideas they believe in, offering a modern approach to portfolio building.",
    },
    {
      img: "media/image/products-sensibull.webp",
      alt: "Sensibull",
      title: "Sensibull",
      desc: "India’s most popular options trading platform for options strategies and analysis. Sensibull simplifies options trading for both beginners and experts with strategy builders and risk analysis tools.",
    },
    {
      img: "media/image/products-streak.webp",
      alt: "Streak",
      title: "Streak",
      desc: "Easy to use algo trading platform for traders who want to automate their strategies. Streak enables backtesting, deploying, and managing algo strategies without coding knowledge.",
    },
  ];

  return (

<>

    <Navbar/>
    <section className="products-section">
      <div className="products-container">
        <h2 className="products-title">Our Products</h2>
        <p className="products-description">
          Explore our suite of powerful and easy-to-use products designed for traders and investors alike.
        </p>

        {products.map((product, index) => (
          <div className={`product-row ${index % 2 !== 0 ? "reverse" : ""}`} key={index}>
            <div className="product-image-wrapper">
              <img src={product.img} alt={product.alt} className="product-image" />
            </div>
            <div className="product-details">
              <h3>{product.title}</h3>
              <p>{product.desc}</p>
              <button className="btn-learn">Learn More</button>
            </div>
          </div>
        ))}
      </div>
    </section>

        <Footer/>
    </>
  );
}

export default ProductPage;
