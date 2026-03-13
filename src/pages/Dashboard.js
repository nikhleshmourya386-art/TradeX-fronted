import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Final from "../components/Final";

const Dashboard = () => {
  const [userData, setUserData] = useState("");
  const [error, setError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  // 🔁 Prevent browser back
  useEffect(() => {
    // Push fake state to history
    window.history.pushState(null, "", window.location.href);

    const onPopState = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);
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
          console.log("User Data:", response.data.user);
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

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    // Optional: remove token from localStorage
    localStorage.removeItem("token");

    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      navigate("/login");
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <>
      {/* <h1>Dashboard</h1>
      <div className="user-info">
        <p><strong>Name:</strong> {userData.name || "N/A"}</p>
        <p><strong>Email:</strong> {userData.email || "N/A"}</p>
        <p><strong>Phone:</strong> {userData.phone || "N/A"}</p>
        <p><strong>Id:</strong> ₹{userData.user || "no id recived"}</p>
        </div> */}


      <Final />
      {/* <div style={{ padding: "1rem" }}>
        <h3>Welcome, {userData?.name || "User"}!</h3>
        <button
          onClick={handleLogout}
          className="btn btn-danger"
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div> */}
    </>
  );
};

export default Dashboard;
