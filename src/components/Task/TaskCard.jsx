// src/components/Task/TaskCard.jsx
import React from "react";

function TaskCard({ task }) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        width: '200px'
      }}
    >
      <h4>{task.title}</h4>
      <p>Status: {task.status}</p>
    </div>
  );
}

export default TaskCard;
