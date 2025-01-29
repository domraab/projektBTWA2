// src/pages/TasksPage.jsx
import React, { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";
import TaskCard from "../components/Task/TaskCard";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    (async () => {
      const data = await getTasks();
      setTasks(data);
    })();
  }, []);

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredTasks = tasks.filter((t) => {
    if (!filterStatus) return true; 
    return t.status === filterStatus;
  });

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 text-gray-800">All Tasks</h2>
      </div>
      <div className="mb-3">
        <label className="form-label">Filter by status:</label>
        <select
          className="form-select form-control"
          value={filterStatus}
          onChange={handleFilterChange}
          style={{ maxWidth: "200px" }}
        >
          <option value="">-- All --</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="On Hold">On Hold</option>
          <option value="Done">Done</option>
        </select>
      </div>


      <div className="row">
        {filteredTasks.map((task) => (
          <TaskCard title={task.title} status={task.status} id={task.id} description={task.description}/>
        ))}
      </div>
    </div>
  );
}

export default TasksPage;
