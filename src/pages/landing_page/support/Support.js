
import React, { useState } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

function SupportPage() {
  const topics = [
    { category: "Account Opening", items: ["Resident individual", "Minor", "NRI", "Company, Partnership, HUF & LLP", "Glossary"] },
    { category: "Your TradeX Account", items: ["Your Profile", "Account modification", "CMR & DP", "Nomination", "Transfer & conversion of securities"] },
    { category: "Kite", items: ["IPO", "Trading FAQs", "Margin Trading & Margins", "Charts and orders", "Alerts and Nudges", "General"] },
    { category: "Funds", items: ["Add money", "Withdraw money", "Add bank accounts", "eMandates"] },
    { category: "Console", items: ["Portfolio", "Corporate actions", "Funds statement", "Reports", "Profile", "Segments"] },
    { category: "Coin", items: ["Mutual funds", "NPS", "Fixed Deposit (FD)", "Features on Coin", "Payments and Orders", "General"] },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);

  const filteredTopics = topics.map((topic) => ({
    ...topic,
    items: topic.items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((topic) => topic.items.length > 0);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    // Search logic is already handled in the filteredTopics calculation
  };

  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  // Inline styles
  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '20px auto',
      fontFamily: 'Arial, sans-serif',
      padding: '0 20px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    headerTitle: {
      fontSize: '2.2rem',
      color: '#2962ff',
      marginBottom: '10px'
    },
    headerSubtitle: {
      color: '#666',
      fontSize: '1rem'
    },
    searchSection: {
      marginBottom: '25px'
    },
    searchBar: {
      display: 'flex',
      marginBottom: '10px'
    },
    searchInput: {
      flex: '1',
      padding: '12px 15px',
      border: '1px solid #ddd',
      borderRadius: '4px 2px 2px 4px',
      fontSize: '1rem',
      outline: 'none'
    },
    searchButton: {
      padding: '12px 20px',
      backgroundColor: '#2962ff',
      color: 'white',
      border: 'none',
      borderRadius: '0 4px 4px 0',
      cursor: 'pointer',
      fontSize: '1rem'
    },
    example: {
      color: '#666',
      fontSize: '0.9rem',
      margin: '5px 0 0 0'
    },
    quickLinks: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginBottom: '25px',
      justifyContent: 'center'
    },
    quickLink: {
      color: '#2962ff',
      textDecoration: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      backgroundColor: '#f0f5ff',
      fontSize: '0.9rem'
    },
    featured: {
      marginBottom: '30px',
      backgroundColor: '#f5f7ff',
      padding: '15px 20px',
      borderRadius: '8px'
    },
    featuredTitle: {
      color: '#333',
      marginTop: '0',
      marginBottom: '15px'
    },
    featuredItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 0',
      color: '#444'
    },
    featuredBullet: {
      display: 'inline-block',
      width: '8px',
      height: '8px',
      backgroundColor: '#2962ff',
      borderRadius: '50%',
      marginRight: '10px'
    },
    topicsSection: {
      marginBottom: '30px'
    },
    topicsTitle: {
      color: '#333',
      marginBottom: '20px'
    },
    categories: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },
    category: {
      border: '1px solid #eee',
      borderRadius: '6px',
      overflow: 'hidden'
    },
    categoryHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 20px',
      backgroundColor: '#f9f9f9',
      cursor: 'pointer'
    },
    categoryName: {
      color: '#2962ff',
      fontWeight: '500',
      margin: '0'
    },
    categoryIcon: {
      transition: 'transform 0.3s',
      transform: activeCategory ? 'rotate(180deg)' : 'rotate(0deg)'
    },
    itemsList: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
      maxHeight: activeCategory ? '500px' : '0',
      overflow: 'hidden',
      transition: 'max-height 0.3s ease'
    },
    item: {
      padding: '12px 20px',
      borderTop: '1px solid #eee',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      backgroundColor: '#fff'
    },
    noResults: {
      textAlign: 'center',
      padding: '30px',
      color: '#666'
    },
    '@media (max-width: 768px)': {
      container: {
        padding: '0 15px'
      },
      quickLinks: {
        justifyContent: 'center'
      }
    }
  };

  return (

    <>

    <Navbar/>
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Support Portal</h1>
        <p style={styles.headerSubtitle}>How can we help you today?</p>
      </div>

      <div style={styles.searchSection}>
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search for an answer or browse help topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            style={styles.searchInput}
          />
          <button 
            onClick={handleSearch}
            style={styles.searchButton}
          >
            Search
          </button>
        </div>
        <p style={styles.example}>
          Eg: how do I activate F&O, why is my order getting rejected ...
        </p>
      </div>

      <div style={styles.quickLinks}>
        <a href="#" style={styles.quickLink}>Track account opening</a>
        <a href="#" style={styles.quickLink}>Track segment activation</a>
        <a href="#" style={styles.quickLink}>Intraday margins</a>
        <a href="#" style={styles.quickLink}>Kite user manual</a>
      </div>

      <div style={styles.featured}>
        <h3 style={styles.featuredTitle}>Featured Updates</h3>
        <div style={styles.featuredItem}>
          <span style={styles.featuredBullet}></span>
          Quarterly Settlement of Funds - July 2025
        </div>
        <div style={styles.featuredItem}>
          <span style={styles.featuredBullet}></span>
          Exclusion of F&O contracts on 8 securities from August 29, 2025
        </div>
      </div>

      <div style={styles.topicsSection}>
        <h3 style={styles.topicsTitle}>Help Topics</h3>

        <div style={styles.categories}>
          {filteredTopics.length === 0 ? (
            <div style={styles.noResults}>No matching results found</div>
          ) : (
            filteredTopics.map((topic, index) => (
              <div key={index} style={styles.category}>
                <div 
                  style={styles.categoryHeader}
                  onClick={() => toggleCategory(topic.category)}
                >
                  <h4 style={styles.categoryName}>{topic.category}</h4>
                  <span style={styles.categoryIcon}>▼</span>
                </div>
                <ul 
                  style={{
                    ...styles.itemsList,
                    maxHeight: activeCategory === topic.category ? '500px' : '0'
                  }}
                >
                  {topic.items.map((item, i) => (
                    <li 
                      key={i} 
                      style={styles.item}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>


          <Footer/>
    </>
  );
}

export default SupportPage;