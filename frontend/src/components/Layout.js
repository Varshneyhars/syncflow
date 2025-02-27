import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    
    const handleLogout = () => {
        console.log("User logged out");
        navigate("/login");
    };
    
    const isActive = (path) => {
        return location.pathname === path;
    };
    
    return (
        <div className="d-flex vh-100">
            {/* Sidebar */}
            <nav className={`sidebar bg-dark-navy transition-all ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header d-flex justify-content-center align-items-center p-3  border-bottom border-dark">
    {!collapsed && <h2 className="text-gradient m-0 fw-bold text-center">MyApp</h2>}
</div>

                
                <div className="sidebar-content p-2">
                    {/* Main Menu Item */}
                    <ul className="nav flex-column gap-1 mt-3">
                        <li className="nav-item">
                            <Link 
                                to="/dashboard" 
                                className={`nav-link rounded py-2 ${isActive('/dashboard') ? 'active' : ''}`}
                            >
                                <span className="nav-icon">🏠</span>
                                {!collapsed && <span className="ms-3">Dashboard</span>}
                            </Link>
                        </li>
                    </ul>
                    
                    {/* Data Section */}
                    <div className="menu-section mt-4">
                        {!collapsed && <div className="section-title">Data</div>}
                        <ul className="nav flex-column gap-1 mt-2">
                            <li className="nav-item">
                                <Link 
                                    to="/manage-users" 
                                    className={`nav-link rounded py-2 ${isActive('/manage-users') ? 'active' : ''}`}
                                >
                                    <span className="nav-icon">👥</span>
                                    {!collapsed && <span className="ms-3">Manage user</span>}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    to="/tasks" 
                                    className={`nav-link rounded py-2 ${isActive('/tasks') ? 'active' : ''}`}
                                >
                                    <span className="nav-icon">📄</span>
                                    {!collapsed && <span className="ms-3">✅ Tasks</span>}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    to="/contacts" 
                                    className={`nav-link rounded py-2 ${isActive('/contacts') ? 'active' : ''}`}
                                >
                                    <span className="nav-icon">📇</span>
                                    {!collapsed && <span className="ms-3">Contacts Information</span>}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Pages Section */}
                    <div className="menu-section mt-4">
                        {!collapsed && <div className="section-title" >Pages</div>}
                        <ul className="nav flex-column gap-1 mt-2">
                            <li className="nav-item">
                                <Link 
                                    to="/profile" 
                                    className={`nav-link rounded py-2 ${isActive('/profile') ? 'active' : ''}`}
                                >
                                    <span className="nav-icon">👤</span>
                                    {!collapsed && <span className="ms-3">Profile Form</span>}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    to="/calendar" 
                                    className={`nav-link rounded py-2 ${isActive('/calendar') ? 'active' : ''}`}
                                >
                                    <span className="nav-icon">📅</span>
                                    {!collapsed && <span className="ms-3">Calendar</span>}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    to="/faq" 
                                    className={`nav-link rounded py-2 ${isActive('/faq') ? 'active' : ''}`}
                                >
                                    <span className="nav-icon">❓</span>
                                    {!collapsed && <span className="ms-3">FAQ Page</span>}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Charts Section */}
                    
                </div>
                
                <div className="sidebar-footer mt-auto p-3 border-top border-dark">
                    {!collapsed && 
                        <div className="d-grid">
                            <button className="btn btn-danger" onClick={handleLogout}>
                                <span className="nav-icon">🚪</span> Logout
                            </button>
                        </div>
                    }
                    {collapsed && 
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-sm btn-danger p-2" onClick={handleLogout}>
                                🚪
                            </button>
                        </div>
                    }
                </div>
            </nav>
            
            {/* Main Content */}
            <div className="main-content flex-grow-1 bg-light d-flex flex-column overflow-hidden">
                {/* Top Navbar */}
                <nav className="navbar bg-white shadow-sm px-4">
                    <div className="d-flex align-items-center">
                        <span className="navbar-brand fw-bold d-none d-md-block">
                            {location.pathname.replace('/', '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Dashboard'}
                        </span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <div className="position-relative">
                            <button className="btn btn-light position-relative p-2">
                                <span className="notification-icon">🔔</span>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    3
                                </span>
                            </button>
                        </div>
                        <div className="dropdown">
                            <button 
                                className="btn dropdown-toggle d-flex align-items-center gap-2" 
                                type="button" 
                                id="userDropdown" 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                            >
                                <div className="avatar-container">
                                    <img 
                                        src="https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png" 
                                        alt="User" 
                                        className="user-avatar" 
                                    />
                                </div>
                                <span className="fw-medium d-none d-md-block">Alex Johnson</span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end shadow border-0" aria-labelledby="userDropdown">
                                <li className="dropdown-header">
                                    <strong>Alex Johnson</strong>
                                    <p className="text-muted mb-0 small">Product Manager</p>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link to="/profile" className="dropdown-item">👤 Profile</Link></li>
                                <li><Link to="/settings" className="dropdown-item">⚙️ Settings</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                                        🚪 Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                
                {/* Page Content */}
                <div className="content p-4 overflow-auto">
                    <Outlet />
                </div>
            </div>
            
            {/* CSS */}
            <style jsx>{`
                :root {
                    --accent-color: #5e72e4;
                    --accent-hover: #4a5dd0;
                    --sidebar-width: 250px;
                    --sidebar-collapsed-width: 70px;
                }
                
                .sidebar {
                    width: var(--sidebar-width);
                    height: 100vh;
                    position: fixed;
                    transition: width 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    z-index: 1000;
                    box-shadow: 0 0 15px rgba(0,0,0,0.1);
                    overflow-y: auto;
                }
                
                .bg-dark-navy {
                    background-color: #1a1e37;
                }
                
                .sidebar.collapsed {
                    width: var(--sidebar-collapsed-width);
                }
                
                .main-content {
                    margin-left: var(--sidebar-width);
                    transition: margin-left 0.3s ease;
                }
                
                .sidebar.collapsed + .main-content {
                    margin-left: var(--sidebar-collapsed-width);
                }
                
                .section-title {
                    color: #8a94a6;
                    font-size: 0.8rem;
                    padding: 0.5rem 1rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    opacity: 0.8;
                }
                
                .nav-link {
                    color: #a8b5c3;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                }
                
                .nav-link:hover {
                    color: #ffffff;
                    background-color: rgba(255,255,255,0.1);
                }
                
                .nav-link.active {
                    color: #ffffff;
                    background-color: var(--accent-color);
                    box-shadow: 0 4px 10px rgba(94,114,228,0.3);
                }
                
                .nav-icon {
                    font-size: 1.1rem;
                    display: inline-block;
                    width: 20px;
                    text-align: center;
                }
                
                .text-gradient {
                    background: linear-gradient(45deg, #5e72e4, #11cdef);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                
                .avatar-container {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 2px solid var(--accent-color);
                }
                
                .user-avatar {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                .notification-icon {
                    font-size: 1.2rem;
                }
                
                .transition-all {
                    transition: all 0.3s ease;
                }
                
                .dropdown-menu {
                    border-radius: 0.5rem;
                    overflow: hidden;
                }
                
                .dropdown-item {
                    padding: 0.75rem 1rem;
                    transition: all 0.2s;
                }
                
                .dropdown-item:hover {
                    background-color: #f8f9fa;
                    transform: translateX(5px);
                }
                
                .dropdown-header {
                    background-color: #f8f9fa;
                    padding: 1rem;
                }
                
                .content {
                    height: calc(100vh - 70px);
                    background-color: #f8f9fe;
                }
            `}</style>
        </div>
    );
};

export default Layout;