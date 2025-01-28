// src/pages/DashboardPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

function DashboardPage() {

  const user = getCurrentUser();
  const userRoles = user?.roles || []; 


  const allBoxes = [
    {
      id: 1,
      icon: "fas fa-folder", 
      title: "Projects",
      desc: "Manage your projects",
      link: "/projects",
      roles: ["manager", "developer", "tester"]
    },
    {
      id: 2,
      icon: "fas fa-tasks",
      title: "Tasks",
      desc: "Track your tasks efficiently",
      link: "/tasks",
      roles: ["manager", "developer", "tester"]
    },
    {
      id: 3,
      icon: "fas fa-chart-bar",
      title: "Reports",
      desc: "Reporting for managers only",
      link: "/reports",
      roles: ["manager"] 
    },
    {
      id: 4,
      icon: "fas fa-user",
      title: "Users",
      desc: "User management (only managers)",
      link: "/users",
      roles: ["manager"] 
    },
    {
      id: 5,
      icon: "fas fa-cog",
      title: "Settings",
      desc: "Application settings and preferences",
      link: "/settings",
      roles: ["manager", "developer", "tester"] 
    }
  ];


  const visibleBoxes = allBoxes.filter((box) =>
    box.roles.some((r) => userRoles.includes(r))
  );

  return (
    <div className="container-fluid">
      <h2>Dashboard</h2>
      <div className="row">

        {visibleBoxes.map((box) => (
          <div key={box.id} className="col-md-4 mb-4">

            <Link to={box.link} style={{ textDecoration: "none" }}>
              <div className="card shadow h-100 py-2">
                <div className="card-body text-center">

                  <i className={`${box.icon} fa-2x text-primary mb-3`}></i>

                  <h5 className="text-primary">{box.title}</h5>

                  <p className="text-muted">{box.desc}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
