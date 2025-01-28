// src/pages/ProjectDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjects, updateProjectStatus } from "../services/projectService";
import { getTasks, createTask } from "../services/taskService";
import TaskList from "../components/Task/TaskList";
import TaskForm from "../components/Task/TaskForm";

function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [projectTasks, setProjectTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const allProjects = await getProjects();
        const found = allProjects.find((p) => p.id === parseInt(id));
        setProject(found);

        const allTasks = await getTasks();
        const filtered = allTasks.filter((t) => t.projectId === parseInt(id));
        setProjectTasks(filtered);

        setLoading(false);
      } catch (error) {
        console.error("Error loading project detail:", error);
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-4">Loading project...</p>;
  }

  if (!project) {
    return (
      <div className="container-fluid">
        <h2 className="h4 text-gray-800">Project not found</h2>
      </div>
    );
  }


  const handleChangeStatus = async (newStatus) => {
    await updateProjectStatus(project.id, newStatus);
    setProject({ ...project, status: newStatus });
  };


  const handleCreateTask = async (taskData) => {
    const created = await createTask(taskData);
    setProjectTasks([...projectTasks, created]);
  };

  return (
    <div className="container-fluid">

      <h2 className="h3 mb-4 text-gray-800">Project Detail</h2>


      <div className="card shadow mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Name: {project.name}</h5>
          <p className="card-text">
            <strong>Description:</strong> {project.description}
          </p>
          <p className="card-text">
            <strong>Status:</strong> {project.status}
          </p>

          <div className="mb-3">
            <button
              className="btn btn-sm btn-secondary mr-2"
              onClick={() => handleChangeStatus("In Progress")}
            >
              Set In Progress
            </button>
            <button
              className="btn btn-sm btn-success"
              onClick={() => handleChangeStatus("Done")}
            >
              Set Done
            </button>
          </div>
        </div>
      </div>


      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Tasks for this project
          </h6>
        </div>
        <div className="card-body">
          {projectTasks.length === 0 ? (
            <p>No tasks found for this project.</p>
          ) : (
            <TaskList tasks={projectTasks} />
          )}
        </div>
      </div>


      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Create Task</h6>
        </div>
        <div className="card-body">
          <TaskForm onSubmit={handleCreateTask} projectId={project.id} />
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailPage;
