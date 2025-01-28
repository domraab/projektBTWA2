// src/pages/ReportsPage.jsx
import React, { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";
import { getProjects } from "../services/projectService";

function ReportsPage() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

 
  const [taskTotal, setTaskTotal] = useState(0);
  const [projectTotal, setProjectTotal] = useState(0);

  const [taskCounts, setTaskCounts] = useState({});
  const [projectCounts, setProjectCounts] = useState({});

  useEffect(() => {
    async function loadData() {
      try {
        const allTasks = await getTasks();
        setTasks(allTasks);

        const allProjects = await getProjects();
        setProjects(allProjects);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    }
    loadData();
  }, []);


  useEffect(() => {
    if (tasks.length > 0) {
      const total = tasks.length;
      setTaskTotal(total);


      const counts = {};
      for (let t of tasks) {
        const st = t.status; 
        if (!counts[st]) {
          counts[st] = 0;
        }
        counts[st]++;
      }
      setTaskCounts(counts);
    }
  }, [tasks]);


  useEffect(() => {
    if (projects.length > 0) {
      const total = projects.length;
      setProjectTotal(total);


      const counts = {};
      for (let p of projects) {
        const st = p.status;
        if (!counts[st]) {
          counts[st] = 0;
        }
        counts[st]++;
      }
      setProjectCounts(counts);
    }
  }, [projects]);

  return (
    <div className="container-fluid">
      <h2 className="h3 mb-4 text-gray-800">Reports &amp; Statistics</h2>

      <div className="row">

        <div className="col-md-6 mb-4">
          <div className="card shadow h-100">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Task Overview
              </h6>
            </div>
            <div className="card-body">
              <p>
                <strong>Total Tasks:</strong> {taskTotal}
              </p>
              {Object.keys(taskCounts).map((statusKey) => (
                <p key={statusKey}>
                  <strong>{statusKey}:</strong> {taskCounts[statusKey]}
                </p>
              ))}
            </div>
          </div>
        </div>


        <div className="col-md-6 mb-4">
          <div className="card shadow h-100">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Project Overview
              </h6>
            </div>
            <div className="card-body">
              <p>
                <strong>Total Projects:</strong> {projectTotal}
              </p>
              {Object.keys(projectCounts).map((statusKey) => (
                <p key={statusKey}>
                  <strong>{statusKey}:</strong> {projectCounts[statusKey]}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
