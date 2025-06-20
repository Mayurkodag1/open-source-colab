import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";
import "../MaintainerNavbar/MaintainerNavbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function MaintainerNavbar() {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [maintainer, setMaintainer] = useState(null);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (showProfileModal && token && userId) {
            axios.get(`http://localhost:3000/api/admin/maintainers/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                setMaintainer(res.data);
            }).catch(err => {
                console.error("Error fetching profile:", err);
                setMaintainer(null);
            });
        }
    }, [showProfileModal, token, userId]);



    useEffect(() => {
        const body = document.body;
        if (showLogoutModal || showProfileModal) {
            body.classList.add("modal-open");
        } else {
            body.classList.remove("modal-open");
        }
    }, [showLogoutModal, showProfileModal]);

    const handleLogout = () => {
        setShowLogoutModal(false);
        logout();
        navigate("/");
    };

    return (
        <>
            <nav className="navbar maintainer navbar-expand-sm">
                <div className="container-fluid">
                    <Link className="navbar-brand logo maintainer" to="/">
                        <span className="logo_Blog_Color maintainer">OPEN</span>&nbsp;
                        <span className="logo_color maintainer">SOURCE</span>
                    </Link>

                    <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon bg-light"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav navbar_list maintainer mx-auto">
                            <li className="nav-item navbar_nav-item maintainer">
                                <NavLink className="nav-link navbar_links maintainer" to="/maintainer-manage-project">
                                    Manage Project
                                </NavLink>
                            </li>
                            <li className="nav-item navbar_nav-item maintainer">
                                <NavLink className="nav-link navbar_links maintainer" to="/maintainer-contribution-tracking">
                                    Contribution Tracking
                                </NavLink>
                            </li>
                        </ul>

                        <div className="me-4">
                            <FontAwesomeIcon
                                icon={faUser}
                                style={{ color: '#F18c00', cursor: 'pointer' }}
                                onClick={() => setShowProfileModal(true)}
                            />
                        </div>

                        <div className="ms-auto">
                            {isAuthenticated ? (
                                <button className="btn btn-outline-warning" onClick={() => setShowLogoutModal(true)}>
                                    Logout
                                </button>
                            ) : (
                                <div className="dropdown">
                                    <button className="btn btn-outline navbar_login_button maintainer dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Login
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/maintainers-login">Maintainers Login</Link></li>
                                        <li><Link className="dropdown-item" to="/contributors-login">Contributors Login</Link></li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* 🔓 Logout Modal */}
            {showLogoutModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Logout</h5>
                                <button type="button" className="btn-close" onClick={() => setShowLogoutModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to logout?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowLogoutModal(false)}>Cancel</button>
                                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 👤 Profile Modal */}
            {showProfileModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Maintainer Profile</h5>
                                <button type="button" className="btn-close" onClick={() => setShowProfileModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                {!maintainer ? (
                                    <div className="text-center">Loading profile...</div>
                                ) : (
                                    <div className="container">
                                        <div className="card shadow p-4">
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold">Name:</label>
                                                    <p>{maintainer.firstName+maintainer.lastName}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold">Email:</label>
                                                    <p>{maintainer.email}</p>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold">Role:</label>
                                                    <p>Maintainer</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold">Updated At:</label>
                                        <p>
  {maintainer.updatedAt
    ? new Date(maintainer.updatedAt).toISOString().slice(0, 10)
    : "No date available"}
</p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowProfileModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MaintainerNavbar;




// import React, { useContext, useState, useEffect } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { AuthContext } from "../AuthContext/AuthContext";
// import "../MaintainerNavbar/MaintainerNavbar.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';



// function MaintainerNavbar() {
//     const { isAuthenticated, logout } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [showModal, setShowModal] = useState(false);
    

//     const handleLogout = () => {
//         setShowModal(false);
//         logout();
//         navigate("/");
//     };

//     useEffect(() => {
//         if (showModal) {
//             document.body.classList.add("modal-open");
//         } else {
//             document.body.classList.remove("modal-open");
//         }
//     }, [showModal]);

//     return (
//         <>
//             <nav className="navbar maintainer navbar-expand-sm">
//                 <div className="container-fluid">
//                     <Link className="navbar-brand logo maintainer" to="/">
//                         <span className="logo_Blog_Color maintainer">OPEN</span>&nbsp;
//                         <span className="logo_color maintainer">SOURCE</span>
//                     </Link>

//                     <button
//                         className="navbar-toggler bg-light"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#mynavbar"
//                     >
//                         <span className="navbar-toggler-icon bg-light"></span>
//                     </button>

//                     <div className="collapse navbar-collapse" id="mynavbar">
//                         <ul className="navbar-nav navbar_list maintainer mx-auto">
//                             {/* <li className="nav-item navbar_nav-item maintainer">
//                                 <NavLink className="nav-link navbar_links maintainer" to="/" end>
//                                     Home
//                                 </NavLink>
//                             </li> */}
//                             <li className="nav-item navbar_nav-item maintainer">
//                                 <NavLink className="nav-link navbar_links maintainer" to="/maintainer-manage-project">
//                                     Manage Project
//                                 </NavLink>
//                             </li>
//                             <li className="nav-item navbar_nav-item maintainer">
//                                 <NavLink className="nav-link navbar_links maintainer" to="/maintainer-contribution-tracking">
//                                     Contribution Tracking
//                                 </NavLink>
//                             </li>
//                             {/* <li className="nav-item navbar_nav-item maintainer">
//                                 <NavLink className="nav-link navbar_links maintainer" to="/services">
//                                     Settings
//                                 </NavLink>
//                             </li> */}
//                         </ul>
//                         <div className="me-5">
//                             <FontAwesomeIcon icon={faUser} style={{ color: '#F18c00' }} />
//                         </div>

//                         <div className="ms-auto">
//                             {isAuthenticated ? (
//                                 <button
//                                     className="btn btn-outline-warning"
//                                     onClick={() => setShowModal(true)}
//                                 >
//                                     Logout
//                                 </button>
//                             ) : (
//                                 <div className="dropdown">
//                                     <button
//                                         className="btn btn-outline navbar_login_button maintainer dropdown-toggle"
//                                         type="button"
//                                         id="dropdownLoginButton"
//                                         data-bs-toggle="dropdown"
//                                         aria-expanded="false"
//                                     >
//                                         Login
//                                     </button>
//                                     <ul className="dropdown-menu" aria-labelledby="dropdownLoginButton">
//                                         <li>
//                                             <Link
//                                                 className="dropdown-item navbar-dropdown-item maintainer"
//                                                 to="/maintainers-login"
//                                             >
//                                                 Maintainers Login
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link
//                                                 className="dropdown-item navbar-dropdown-item maintainer"
//                                                 to="/contributors-login"
//                                             >
//                                                 Contributors Login
//                                             </Link>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </nav>

//             {/* Modal */}
//             {showModal && (
//                 <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
//                     <div className="modal-dialog modal-dialog-centered">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Confirm Logout</h5>
//                                 <button
//                                     type="button"
//                                     className="btn-close"
//                                     onClick={() => setShowModal(false)}
//                                 ></button>
//                             </div>
//                             <div className="modal-body">
//                                 <p>Are you sure you want to logout?</p>
//                             </div>
//                             <div className="modal-footer">
//                                 <button
//                                     type="button"
//                                     className="btn btn-secondary"
//                                     onClick={() => setShowModal(false)}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="button"
//                                     className="btn btn-danger"
//                                     onClick={handleLogout}
//                                 >
//                                     Logout
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

// export default MaintainerNavbar;
