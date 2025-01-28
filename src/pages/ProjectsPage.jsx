// src/pages/ProjectsPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../services/projectService";
import { getCurrentUser } from "../services/authService";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const currentUser = getCurrentUser();
  const userRoles = currentUser?.roles || [];

  useEffect(() => {
    (async () => {
      const data = await getProjects();
      setProjects(data);
    })();
  }, []);

  return (
    <div className="container-fluid">
      {/* Titulek + tlačítko */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 text-gray-800">Projects</h2>
        {userRoles.includes("manager") && (
          <Link to="/projects/create" className="btn btn-primary">
            <i className="fas fa-plus mr-1"></i> Create New Project
          </Link>
        )}
      </div>

      {/* Karty se seznamem projektů */}
      <div className="row">
        {projects.map((proj) => (
          <div key={proj.id} className="col-md-3 mb-4">
            <div className="card shadow h-100">
              <div className="card-body d-flex flex-column">
                <h5>{proj.name}</h5>
                <p className="text-muted">Status: {proj.status}</p>
                <p>{proj.description}</p>

                {/* Tlačítko detail */}
                <Link
                  to={`/projects/${proj.id}`}
                  className="btn btn-sm btn-outline-primary mt-auto"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
