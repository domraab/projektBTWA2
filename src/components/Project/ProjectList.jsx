// src/components/Project/ProjectList.jsx
import React from "react";
import ProjectCard from "./ProjectCard";

function ProjectList({ projects, onSelectProject }) {
  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onSelect={() => onSelectProject(project.id)}
        />
      ))}
    </div>
  );
}

export default ProjectList;
