// src/pages/DashboardPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

function DashboardPage() {
  // Získání informací o uživateli
  const user = getCurrentUser();
  const userRoles = user?.roles || [];  // např. ["manager"] nebo ["developer"]

  // Definice všech karet, které odpovídají položkám v Sidebaru
  // 'roles' definuje, kdo tu kartu může vidět (manager / developer / tester, atd.)
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
      roles: ["manager"] // jen manažer
    },
    {
      id: 4,
      icon: "fas fa-user",
      title: "Users",
      desc: "User management (only managers)",
      link: "/users",
      roles: ["manager"] // jen manažer
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

  // Vyfiltrovat karty podle role uživatele
  // Box se zobrazí, pokud se aspoň jedna role z boxu potká s rolemi usera
  const visibleBoxes = allBoxes.filter((box) =>
    box.roles.some((r) => userRoles.includes(r))
  );

  return (
    <div className="container-fluid">
      <h2>Dashboard</h2>
      <div className="row">
        {/* Projdeme všechny "viditelné" boxy */}
        {visibleBoxes.map((box) => (
          <div key={box.id} className="col-md-4 mb-4">
            {/* Kliknutím na kartu -> Link na danou path */}
            <Link to={box.link} style={{ textDecoration: "none" }}>
              <div className="card shadow h-100 py-2">
                <div className="card-body text-center">
                  {/* Ikona */}
                  <i className={`${box.icon} fa-2x text-primary mb-3`}></i>
                  {/* Titulek */}
                  <h5 className="text-primary">{box.title}</h5>
                  {/* Popis */}
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
