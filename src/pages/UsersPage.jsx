// // src/components/User/UserPage.jsx
import React, { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import UserList from "../components/User/UserList";

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getUsers();
      setUsers(data);
    })();
  }, []);

  return (
    <div className="container-fluid">
      <h2>Users</h2>
      <UserList users={users} />
    </div>
  );
}

export default UsersPage;
