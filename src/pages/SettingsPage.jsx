// src/pages/SettingsPage.jsx
import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../services/authService";
import { getUsers, updateUser } from "../services/userService";

function SettingsPage() {
  const [user, setUser] = useState(null); 
  const [message, setMessage] = useState("");


  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
  
        const current = getCurrentUser();
        if (!current) return;


        const all = await getUsers();
        const found = all.find((u) => u.id === current.id);
        if (found) {
          setUser(found);
          setFullName(found.fullName || "");
          setEmail(found.email || "");
          setPhone(found.phone || "");
        }
      } catch (err) {
        console.error("Error loading user data:", err);
      }
    }
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const updated = {
        ...user,
        fullName,
        email,
        phone
      };
      await updateUser(updated);
      setMessage("Settings saved successfully (mock)!");
    } catch (error) {
      console.error("Failed to update user", error);
      setMessage("Error saving settings");
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-4 text-gray-800">Settings</h1>

      <div className="row">
        <div className="col-md-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                User Profile
              </h6>
            </div>
            <div className="card-body">
              {message && (
                <div className="alert alert-info">{message}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    className="form-control"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
               

                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </form>
            </div>
          </div>
        </div>


        <div className="col-md-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Security
              </h6>
            </div>
            <div className="card-body">
              <p>Change Password</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
