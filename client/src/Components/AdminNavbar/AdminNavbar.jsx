import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

function AdminNavbar() {

    const navigate = useNavigate();

    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    useEffect(() => {
        const adminLoginStatus = localStorage.getItem("adminLogin")
        setIsAdminLoggedIn(adminLoginStatus === "true");
    }, [])

    const handleLogout = () => {
        localStorage.setItem("adminLogin", "false");
        setIsAdminLoggedIn(false);
        // Optionally redirect or show a message
        navigate("/admin")
    };

    const handleLogin = () => {
        localStorage.setItem("adminLogin", "true");
        setIsAdminLoggedIn(true);
        // Optionally redirect to admin dashboard
    };


    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    
                    
                    <div className="dropdown">
                        <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {/* Admin Credentials */}
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <Link className="dropdown-item" to="/admin-home">Home</Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="/admin-project-approval-status">Approve/Reject</Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="/admin-add-edit-category">Manage Skills</Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="/settings">Generate Reports</Link>
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                    <a className="navbar-brand ms-3" href="javascript:void(0)">Admin</a>
                </div>

                <div>
                    {isAdminLoggedIn ? (
                        <button className='btn btn-outline-warning' onClick={handleLogout}>Logout</button>
                    ) : (
                        <button className='btn btn-outline-warning' onClick={handleLogin}>Login</button>
                    )}
                </div>
            </div>
        </nav>
        </div>
    )
}

export default AdminNavbar
