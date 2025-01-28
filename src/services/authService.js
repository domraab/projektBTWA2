// src/services/authService.js
export async function login(username, password) {
    const response = await fetch('/data/users.json');
    const users = await response.json();
  
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!foundUser) {
      throw new Error("Invalid credentials");
    }
  
    localStorage.setItem("user", JSON.stringify(foundUser));
    return foundUser;
  }
  
  export function getCurrentUser() {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  }
  
  export function logout() {
    localStorage.removeItem("user");
  }
  
  export function isLoggedIn() {
    return !!getCurrentUser();
  }
  