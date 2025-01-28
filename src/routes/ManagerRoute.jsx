// src/routes/ManagerRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

function ManagerRoute({ children }) {
  const currentUser = getCurrentUser();
  const isManager = currentUser?.roles.includes("manager");

  if (!isManager) {

    return <Navigate to="/NotFoundPage" replace />;
  }

  return children;
}

export default ManagerRoute;
