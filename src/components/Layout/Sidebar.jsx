// src/components/Layout/Sidebar.jsx

import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";

function Sidebar() {
  const user = getCurrentUser();
  const userRoles = user?.roles || [];

  return (

    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >

      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">PROJECT MGMT</div>
      </a>


      <hr className="sidebar-divider my-0" />


      <li className="nav-item">
        <Link className="nav-link" to="/">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>


      <li className="nav-item">
        <Link className="nav-link" to="/projects">
          <i className="fas fa-fw fa-folder"></i>
          <span>Projects</span>
        </Link>
      </li>


      <li className="nav-item">
        <Link className="nav-link" to="/tasks">
          <i className="fas fa-fw fa-tasks"></i>
          <span>Tasks</span>
        </Link>
      </li>


      {userRoles.includes("manager") && (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/reports">
              <i className="fas fa-fw fa-chart-bar"></i>
              <span>Reports</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/users">
              <i className="fas fa-fw fa-user"></i>
              <span>Users</span>
            </Link>
          </li>
        </>
      )}


      <li className="nav-item">
        <Link className="nav-link" to="/settings">
          <i className="fas fa-fw fa-cog"></i>
          <span>Settings</span>
        </Link>
      </li>

      <hr className="sidebar-divider d-none d-md-block" />

      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </ul>
  );
}

export default Sidebar;
