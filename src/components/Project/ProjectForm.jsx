// src/components/Project/ProjectForm.jsx
import React, { useState } from "react";

function ProjectForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      name,
      description,
      // ...další pole dle potřeby
    };
    onSubmit(newProject);
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '10px' }}>
      <h4>Create Project</h4>
      <div>
        <label>Name</label><br />
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Description</label><br />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <button type="submit" style={{ marginTop: '10px' }}>Create</button>
    </form>
  );
}

export default ProjectForm;
