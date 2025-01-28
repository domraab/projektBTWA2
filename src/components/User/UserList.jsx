
// src/components/User/UserList.jsx
import React from "react";
import UserCard from "./UserCard";

function UserList({ users }) {
  return (
    <div className="row">
      {users.map((u) => (
        <UserCard key={u.id} user={u} />
      ))}
    </div>
  );
}

export default UserList;
