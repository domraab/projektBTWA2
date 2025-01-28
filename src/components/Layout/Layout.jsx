// src/components/Layout/Layout.jsx
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  useEffect(() => {

    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebarToggleTop = document.getElementById("sidebarToggleTop");
    const sidebarElem = document.querySelector(".sidebar");
    const bodyElem = document.body;

    function toggleSidebar() {
      bodyElem.classList.toggle("sidebar-toggled");
      if (sidebarElem) {
        sidebarElem.classList.toggle("toggled");

        if (sidebarElem.classList.contains("toggled")) {
          const collapses = sidebarElem.querySelectorAll(".collapse");
          collapses.forEach((col) => col.classList.remove("show"));
        }
      }
    }

    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", toggleSidebar);
    }
    if (sidebarToggleTop) {
      sidebarToggleTop.addEventListener("click", toggleSidebar);
    }


    return () => {
      if (sidebarToggle) {
        sidebarToggle.removeEventListener("click", toggleSidebar);
      }
      if (sidebarToggleTop) {
        sidebarToggleTop.removeEventListener("click", toggleSidebar);
      }
    };
  }, []);

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Header />
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
