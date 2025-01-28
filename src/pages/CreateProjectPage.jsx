import React, { useState } from "react";
import { getCurrentUser } from "../services/authService";
import { createProject } from "../services/projectService";

function CreateProjectPage() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [message, setMessage] = useState("");

  const currentUser = getCurrentUser();
  const isManager = currentUser?.roles.includes("manager");


  if (!isManager) {
    return <p>Access Denied. Only managers can create projects.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProject = {
        name,
        description,
        status,
        managerId: currentUser.id
      };
      await createProject(newProject);
      setMessage("Project created!");
    } catch (err) {
      console.error(err);
      setMessage("Error creating project");
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="h3 mb-4 text-gray-800">Create New Project</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <div className="card shadow mb-4" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Project Name</label>
              <input
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              Create Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProjectPage;
