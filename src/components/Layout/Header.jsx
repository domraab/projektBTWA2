// src/components/Layout/Header.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout, getCurrentUser } from "../../services/authService";
import { getProjects } from "../../services/projectService";

function Header() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  // Stav pro text v inputu + seznam všech projektů + odfiltrované projekty
  const [searchTerm, setSearchTerm] = useState("");
  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    // Načítáme všechny projekty
    async function loadProjects() {
      try {
        const projects = await getProjects();
        setAllProjects(projects);
      } catch (error) {
        console.error("Failed to load projects:", error);
      }
    }
    loadProjects();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredProjects([]);
      return;
    }
    const results = allProjects.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(results);
  }, [searchTerm, allProjects]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectProject = (projectId) => {
    navigate(`/projects/${projectId}`);
    setFilteredProjects([]);
    setSearchTerm("");
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* Sidebar Toggle (Topbar) pro mobilní verzi */}
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
      >
        <i className="fa fa-bars"></i>
      </button>

      {/* 
        1) Na větších šířkách (≥576px) - inline search bar 
        (d-none d-sm-inline-block = skryto na <576px)
      */}
      <form
        className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="input-group" style={{ position: "relative" }}>
          <input
            type="text"
            className="form-control bg-light border-0 small"
            placeholder="Search projects..."
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ zIndex: 2 }}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">
              <i className="fas fa-search fa-sm"></i>
            </button>
          </div>

          {/* Zobrazení suggestion listu */}
          {filteredProjects.length > 0 && (
            <ul
              className="list-group"
              style={{
                position: "absolute",
                top: "38px",
                left: 0,
                width: "100%",
                zIndex: 10,
              }}
            >
              {filteredProjects.map((proj) => (
                <li
                  key={proj.id}
                  className="list-group-item list-group-item-action"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSelectProject(proj.id)}
                >
                  {proj.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>

      {/* 
        2) Pro menší šířky (<576px) - “Search” ikona vpravo (dropdown)
        - d-sm-none => viditelné jen na XS
      */}
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown no-arrow d-sm-none">
          <a
            className="nav-link dropdown-toggle"
            href="#!"
            id="searchDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-search fa-fw"></i>
          </a>
          {/* Dropdown - pro vyhledávací pole na mobilu */}
          <div
            className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
            aria-labelledby="searchDropdown"
          >
            <form className="form-inline mr-auto w-100 navbar-search"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="input-group" style={{ position: "relative" }}>
                <input
                  type="text"
                  className="form-control bg-light border-0 small"
                  placeholder="Search projects..."
                  aria-label="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit">
                    <i className="fas fa-search fa-sm"></i>
                  </button>
                </div>

                {/* (Volitelně) i tady zobrazit suggestions */}
                {filteredProjects.length > 0 && (
                  <ul
                    className="list-group"
                    style={{
                      position: "absolute",
                      top: "38px",
                      left: 0,
                      width: "100%",
                      zIndex: 10,
                    }}
                  >
                    {filteredProjects.map((proj) => (
                      <li
                        key={proj.id}
                        className="list-group-item list-group-item-action"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSelectProject(proj.id)}
                      >
                        {proj.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </form>
          </div>
        </li>

        {/* 
          3) Dále user info + logout 
        */}
        {user && (
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#!"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                {user.username}
              </span>
              <img
                className="img-profile rounded-circle"
                src="https://source.unsplash.com/QAB-WJcbgJk/60x60"
                alt="profile"
              />
            </a>
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <a className="dropdown-item" href="#!" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </a>
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Header;
