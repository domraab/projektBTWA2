// src/components/Task/TaskForm.jsx
import React, { useState } from "react";

function TaskForm({ onSubmit, projectId }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      projectId,
      status: "To Do",
      assigneeId: null
    });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '10px' }}>
      <h4>Create Task</h4>
      <label>Title</label><br />
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <button type="submit" style={{ marginTop: '10px' }}>Create</button>
    </form>
  );
}

export default TaskForm;
