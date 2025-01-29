// src/components/Task/TaskCard.jsx
import React from "react";

function TaskCard({ id, title, status, description }) {
  return (
    <div key={id} className="col-md-3 mb-4">
    <div className="card shadow h-100">
      <div className="card-body">
        <h5>{title}</h5>
        <p className="text-muted">Status: {status}</p>
        <p>{description}</p>
      </div>
    </div>
  </div>
  );
}

export default TaskCard;
