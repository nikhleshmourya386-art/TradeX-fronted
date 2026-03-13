import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [editMode, setEditMode] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser._id) {
      setUserId(storedUser._id);
      setFormData({
        name: storedUser.name || '',
        email: storedUser.email || '',
        phone: storedUser.phone || '',
      });
    } else {
      navigate("/login"); // redirect if no user
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3002/api/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify(data));
        setEditMode(false);
      } else {
        alert("Update failed: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Error updating profile.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login"); // or "/"
  };

  return (
    <div className="profile-container">
      <div className="header-row">
        <h2>User Profile</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={!editMode}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!editMode}
          required
        />

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={!editMode}
        />

        <div className="button-wrapper">
          {!editMode ? (
            <button type="button" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          ) : (
            <>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
