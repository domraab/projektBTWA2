// src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ProjectsPage from '../pages/ProjectsPage';
import ProjectDetailPage from '../pages/ProjectDetailPage';
import TasksPage from '../pages/TasksPage';
import UsersPage from '../pages/UsersPage';
import SettingsPage from '../pages/SettingsPage';
import NotFoundPage from '../pages/NotFoundPage';
import ReportsPage from '../pages/ReportsPage';
import Layout from '../components/Layout/Layout';
import UserEditPage from "../pages/UserEditPage";
import CreateProjectPage from "../pages/CreateProjectPage";
import { isLoggedIn } from '../services/authService';
import ManagerRoute from "./ManagerRoute";


// Příklad ProtectedRoute
function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:id" element={<ProjectDetailPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route
            path="reports"
            element={
              <ManagerRoute>
                <ReportsPage />
              </ManagerRoute>
            }
          />
          <Route
            path="users"
            element={
              <ManagerRoute>
                <UsersPage />
              </ManagerRoute>
            }
          />          
          <Route
            path="projects/create"
            element={
              <ManagerRoute>
                <CreateProjectPage />
              </ManagerRoute>
            }
          />
          <Route path="users/edit/:id" element={<UserEditPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="NotFoundPage" element={<NotFoundPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
