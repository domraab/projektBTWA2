// src/components/Task/TaskList.jsx
import React from "react";
import TaskCard from "./TaskCard";

function TaskList({ tasks }) {
  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
