import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      // Perform logout logic here
      console.log("User logged out");
      navigate("/login"); // Redirect to login page
    };
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <nav className="col-md-3 col-lg-2 d-md-block bg-dark sidebar vh-100">
                    <div className="position-sticky">
                        <h2 className="text-white text-center py-3">Logo</h2>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link text-white">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/tasks" className="nav-link text-white">Tasks</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/reports" className="nav-link text-white">Reports</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/settings" className="nav-link text-white">Settings</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    {/* Top Navbar */}
                    {/* Top Navbar */}
                    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3">
                        <div className="container-fluid">
                            {/* Navbar Brand or Logo */}
                            <span className="navbar-brand fw-bold fs-5 text-primary">MyApp</span>

                            {/* Navbar Toggler for Mobile View */}
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarContent"
                                aria-controls="navbarContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            {/* Navbar Content */}
                            <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
                                {/* User Dropdown */}
                                <div className="dropdown">
                                    <button
                                        className="btn btn-light dropdown-toggle d-flex align-items-center"
                                        type="button"
                                        id="userDropdown"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <img
                                            src="https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png"
                                            alt="User"
                                            className="rounded-circle me-2"
                                            width="30"
                                            height="30"
                                        />
                                        <span className="fw-medium">Welcome, User!</span>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                        <li>
                                            <Link to="/profile" className="dropdown-item">
                                                <i className="bi bi-person me-2"></i>Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/settings" className="dropdown-item">
                                                <i className="bi bi-gear me-2"></i>Settings
                                            </Link>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <button className="dropdown-item text-danger" onClick={handleLogout}>
                                                <i className="bi bi-box-arrow-right me-2"></i>Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>


                    {/* Page Content */}
                    <div className="content">
                        <Outlet /> {/* Child pages like Dashboard, Tasks, etc. will be rendered here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
