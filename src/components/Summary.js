import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Summary = () => {
const [userData, setUserData] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();


     // ✅ Fetch user data
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

  return (
    <>
      <div className="username">
         <h3>Welcome, {userData?.name || "User"}!</h3>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>3.74k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings (13)</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className="profit">
              1.55k <small>+5.20%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>31.43k</span>{" "}
            </p>
            <p>
              Investment <span>29.88k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
