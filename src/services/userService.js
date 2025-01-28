// src/services/userService.js

let mockUsers = [
  {
    id: 1,
    username: "manager",
    password: "manager123",
    roles: ["manager"],
    email: "manager@example.com",
    fullName: "John Manager",
    phone: "+420123456789",
    jobTitle: "Project Manager"
  },
  {
    id: 2,
    username: "dev1",
    password: "dev123",
    roles: ["developer"],
    email: "dev1@example.com",
    fullName: "Alice Developer",
    phone: "+420111222333",
    jobTitle: "Frontend Developer"
  },
  {
    id: 3,
    username: "tester1",
    password: "test123",
    roles: ["tester"],
    email: "tester1@example.com",
    fullName: "Bob Tester",
    phone: "+420987654321",
    jobTitle: "QA Tester"
  },
  {
    id: 4,
    username: "dev2",
    password: "dev456",
    roles: ["developer"],
    email: "dev2@example.com",
    fullName: "Charlie Dev",
    phone: "+420444555666",
    jobTitle: "Backend Developer"
  }
];

export async function getUsers() {
  return mockUsers;
}

export async function updateUser(updated) {
  const idx = mockUsers.findIndex((u) => u.id === updated.id);
  if (idx === -1) throw new Error("User not found");

  mockUsers[idx] = { ...mockUsers[idx], ...updated };
  console.log("Simulated: user updated ->", mockUsers[idx]);
  return true;
}