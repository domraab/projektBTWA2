// src/pages/ProjectsPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/Project/ProjectCard";
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

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 text-gray-800">Projects</h2>
        {userRoles.includes("manager") && (
          <Link to="/projects/create" className="btn btn-primary">
            <i className="fas fa-plus mr-1"></i> Create New Project
          </Link>
        )}
      </div>


      <div className="row">
        {projects.map((proj) => (
          <ProjectCard name={proj.name} description={proj.description} status={proj.status} id={proj.id}/>
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
