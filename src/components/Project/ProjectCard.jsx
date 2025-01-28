// src/components/Project/ProjectCard.jsx
import React from "react";

function ProjectCard({ project, onSelect }) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        width: '200px',
        cursor: 'pointer'
      }}
      onClick={onSelect}
    >
      <h3>{project.name}</h3>
      <p>Status: {project.status}</p>
    </div>
  );
}

export default ProjectCard;
