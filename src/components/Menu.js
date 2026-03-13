
import React, { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from './logo.png'
import axios from "axios";
import "./Menu.css";

// ✅ You can use a real logo path here
// import logo from '../assets/logo.png';

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

   const [userData, setUserData] = useState("");
    const [error, setError] = useState("");
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

  // ✅ Mock user data (replace with real user data from auth or backend)
  const user = {
    name: "Shani",
    email: "shani@example.com",
    photo: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740", // replace with actual photo URL
  };


useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in. Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.user) {
          setUserData(response.data.user);
        } else {
          throw new Error("No user Data Found");
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        setError("Session expired or unauthorized. Redirecting...");
        setTimeout(() => navigate("/login"), 3000);
      }
    };

    fetchUserData();
  }, [navigate]);



  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="menu-container">
      {/* ✅ Logo (optional) */}
     <img src={logo} alt="no iamge" style={{ width: "70px" }} />

      <div className="menus">
        <ul>
          <li><Link to="/dashboard" onClick={() => handleMenuClick(0)}><p className={selectedMenu === 0 ? "menu selected" : "menu"}>Dashboard</p></Link></li>
          <li><Link to="/orders" onClick={() => handleMenuClick(1)}><p className={selectedMenu === 1 ? "menu selected" : "menu"}>Orders</p></Link></li>
          <li><Link to="/holdings" onClick={() => handleMenuClick(2)}><p className={selectedMenu === 2 ? "menu selected" : "menu"}>Sell</p></Link></li>
          {/* <li><Link to="/positions" onClick={() => handleMenuClick(3)}><p className={selectedMenu === 3 ? "menu selected" : "menu"}>Positions</p></Link></li> */}
          <li><Link to="/funds" onClick={() => handleMenuClick(4)}><p className={selectedMenu === 4 ? "menu selected" : "menu"}>Funds</p></Link></li>
          <li><Link to="/apps" onClick={() => handleMenuClick(6)}><p className={selectedMenu === 6 ? "menu selected" : "menu"}>Apps</p></Link></li>
        </ul>

        <hr />

        {/* ✅ Profile Section with Dropdown */}
        <div
          className="profile"
          onClick={handleProfileClick}
          style={{
            cursor: "pointer",
            position: "relative",
            display: "flex",
            alignItems: "center",
            padding: "10px 0",
          }}
        >
          <img
            src={user.photo}
            alt="Profile"
            className="avatar"
            style={{
              width: "40px",
              height: "40px",
              
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "10px",
            }}
          />
          <p className="username" style={{marginTop:"16px"}}>{userData?.name || "User"}!</p>

          {/* ✅ Dropdown */}
          {isProfileDropdownOpen && (
            <div
              className="profile-dropdown"
              style={{
                position: "absolute",
                top: "60px",
                right: 0,
                background: "#fff",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                width: "220px",
                zIndex: 1000,
                padding: "10px",
              }}
            >
              <div className="user-info" style={{ textAlign: "center", marginBottom: "10px" }}>
                <img
                  src={user.photo}
                  alt="User"
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "8px",
                  }}
                />
                <p className="user-name" style={{ fontWeight: "bold" }}>{  <h5>{userData?.name || "User"}!</h5>}</p>

                <p className="user-email" style={{ fontSize: "16px", color: "#555" }}>{userData?.email|| "User"}</p>
              </div>
              <hr />
              <Link to="#" className="dropdown-item" style={{ display: "block", padding: "8px", textDecoration: "none", color: "#000" }}>👤 User Details</Link>
              <Link to="#" className="dropdown-item" style={{ display: "block", padding: "8px", textDecoration: "none", color: "#000" }}>⚙ Account Settings</Link>
              <button
                className="dropdown-item"
                onClick={handleLogout}
                style={{ display: "block", padding: "8px", width: "100%", border: "none", background: "none", textAlign: "left", cursor: "pointer", color: "#000" }}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;