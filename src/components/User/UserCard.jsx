// src/components/User/UserCard.jsx
import React from "react";
import { Link } from "react-router-dom";

function UserCard({ user }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow h-100">
        <div className="card-body">
          <h5 className="card-title">
            {user.fullName || user.username}
          </h5>
          <p className="card-text mb-1">
            <strong>Username:</strong> {user.username}
          </p>
          {user.email && (
            <p className="card-text mb-1">
              <strong>Email:</strong> {user.email}
            </p>
          )}
          {user.phone && (
            <p className="card-text mb-1">
              <strong>Phone:</strong> {user.phone}
            </p>
          )}
          {user.jobTitle && (
            <p className="card-text mb-1">
              <strong>Job Title:</strong> {user.jobTitle}
            </p>
          )}
          {user.roles && (
            <p className="card-text mb-1">
              <strong>Roles:</strong> {user.roles.join(", ")}
            </p>
          )}

          <Link
            to={`/users/edit/${user.id}`}
            className="btn btn-sm btn-primary mt-2"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
