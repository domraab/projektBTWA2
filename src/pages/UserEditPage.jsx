// src/pages/UserEditPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUsers, updateUser } from "../services/userService";

function UserEditPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [roles, setRoles] = useState([]); 
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const allUsers = await getUsers();
        const userId = parseInt(id, 10);
        const found = allUsers.find((u) => u.id === userId);
        if (found) {
          setUsername(found.username);
          setFullName(found.fullName || "");
          setEmail(found.email || "");
          setPhone(found.phone || "");
          setJobTitle(found.jobTitle || "");
          setRoles(found.roles || []);  
        } else {
          setMessage("User not found");
        }
      } catch (err) {
        console.error("Failed to load user:", err);
        setMessage("Error loading user data");
      }
    }
    loadData();
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = parseInt(id, 10);
      const updated = {
        id: userId,
        username,
        fullName,
        email,
        phone,
        jobTitle,
        roles  // klíčové: uložit do useru
      };
      await updateUser(updated);
      setMessage("User updated successfully (mock)!");
      navigate("/users");
    } catch (err) {
      console.error("Failed to update user:", err);
      setMessage("Error updating user data");
    }
  };


  const handleRolesChange = (e) => {

    const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
    setRoles(selected);
  };

  return (
    <div className="container-fluid">
      <h2>Edit User</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input
            className="form-control"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>


        <div className="mb-3">
          <label className="form-label">Roles</label>
          <select
            multiple
            className="form-select form-control"
            value={roles}
            onChange={handleRolesChange}
          >
            <option value="manager">Manager</option>
            <option value="developer">Developer</option>
            <option value="tester">Tester</option>
          </select>
          <small className="text-muted">Ctrl+kliknutím (Windows) nebo Cmd+kliknutím (Mac) vyberete více rolí</small>
        </div>

        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default UserEditPage;
