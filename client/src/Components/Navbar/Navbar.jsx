import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";
import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showContributorModal, setShowContributorModal] = useState(false);
  const [contributor, setContributor] = useState(null);

  useEffect(() => {
    const contributorId = localStorage.getItem("contributorId");
    const token = localStorage.getItem("contributorToken");

    if (contributorId && token) {
      axios.get(`http://localhost:3000/api/admin/contributors/${contributorId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          setContributor(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch contributor:", err);
        });
    }
  }, []);

  useEffect(() => {
    if (showLogoutModal || showContributorModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [showLogoutModal, showContributorModal]);

  const handleLogout = () => {
    setShowLogoutModal(false);
    logout();
    localStorage.removeItem("contributorToken");
    localStorage.removeItem("contributorId");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm">
        <div className="container-fluid">
          <Link className="navbar-brand logo" to="/">
            <span className="logo_Blog_Color">OPEN</span>&nbsp;
            <span className="logo_color">SOURCE</span>
          </Link>

          <button
            className="navbar-toggler bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon bg-light"></span>
          </button>

          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav navbar_list mx-auto">
              <li className="nav-item navbar_nav-item">
                <NavLink className="nav-link navbar_links" to="/" end>
                  Home
                </NavLink>
              </li>
              <li className="nav-item navbar_nav-item">
                <NavLink className="nav-link navbar_links" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item navbar_nav-item">
                <NavLink className="nav-link navbar_links" to="/services">
                  Services
                </NavLink>
              </li>
            </ul>

            <div className="ms-auto d-flex align-items-center gap-3">
              {isAuthenticated && contributor && (
                <div
                  className="d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowContributorModal(true)}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ color: "#F18c00", fontSize: "1.5rem", marginRight: "8px" }}
                    title="Contributor Profile"
                  />
                 
                </div>
              )}

              {isAuthenticated ? (
                <button
                  className="btn btn-outline-warning"
                  onClick={() => setShowLogoutModal(true)}
                >
                  Logout
                </button>
              ) : (
                <div className="dropdown">
                  <button
                    className="btn btn-outline navbar_login_button dropdown-toggle"
                    type="button"
                    id="dropdownLoginButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Login
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownLoginButton">
                    <li>
                      <Link className="dropdown-item navbar-dropdown-item" to="/maintainers-login">
                        Maintainers Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item navbar-dropdown-item" to="/contributors-login">
                        Contributors Login
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
                <button className="btn-close" onClick={() => setShowLogoutModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to logout?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowLogoutModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contributor Profile Modal */}
      {showContributorModal && contributor && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Contributor Profile</h5>
                <button className="btn-close" onClick={() => setShowContributorModal(false)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {contributor.firstName + contributor.lastName|| "N/A"}</p>
                <p><strong>Email:</strong> {contributor.email || "N/A"}</p>
                <p><strong>Updated At:</strong> {contributor.updatedAt ? new Date(contributor.updatedAt).toLocaleDateString() : "No date available"}</p>
       
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowContributorModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
