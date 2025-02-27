import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Layout = () => {
    const navigate = useNavigate();
    const [hoveredCard, setHoveredCard] = useState(null);
    const [expandedCard, setExpandedCard] = useState(null);
    const [selectedUser, setSelectedUser] = useState("User1"); // Default user

    const handleLogout = () => {
        console.log("User logged out");
        navigate("/login");
    };

    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
    };

    // Example data for different users
    const userData = {
        User1: {
            lineChartData: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [
                    {
                        label: "Monthly Sales",
                        data: [12, 19, 3, 5, 2, 3],
                        fill: false,
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        tension: 0.4,
                    },
                ],
            },
            barChartData: {
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [
                    {
                        label: "Daily Visits",
                        data: [65, 59, 80, 81, 56, 55, 40],
                        backgroundColor: "rgba(54, 162, 235, 0.5)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                    },
                ],
            },
            pieChartData: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
                datasets: [
                    {
                        label: "Product Categories",
                        data: [12, 19, 3, 5, 2],
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(54, 162, 235, 0.6)",
                            "rgba(255, 206, 86, 0.6)",
                            "rgba(75, 192, 192, 0.6)",
                            "rgba(153, 102, 255, 0.6)",
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            doughnutChartData: {
                labels: ["Direct", "Referral", "Social", "Organic"],
                datasets: [
                    {
                        label: "Traffic Sources",
                        data: [300, 50, 100, 80],
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(54, 162, 235, 0.6)",
                            "rgba(255, 206, 86, 0.6)",
                            "rgba(75, 192, 192, 0.6)",
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                        ],
                        borderWidth: 1,
                    },
                ],
            },
        },
        User2: {
            // Different data for User2
        },
    };

    const getCardStyle = (index) => {
        const gradients = [
            "linear-gradient(135deg, #f6f9fc 0%, #eef1f5 100%)",
            "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
            "linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)",
            "linear-gradient(135deg, #f8f9fa 0%, #e2e8f0 100%)"
        ];

        return {
            transition: "all 0.3s ease",
            transform: hoveredCard === index ? "translateY(-5px)" : "translateY(0)",
            boxShadow:
                hoveredCard === index
                    ? "0 10px 20px rgba(0,0,0,0.1)"
                    : "0 4px 6px rgba(0,0,0,0.05)",
            cursor: "pointer",
            height: "100%",
            background: gradients[index % gradients.length],
        };
    };

    const cardSizes = ["col-md-8", "col-md-4", "col-md-4", "col-md-8"];

    const cards = [
        {
            title: "Revenue Overview",
            chart: <Line data={userData[selectedUser].lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />,
            description: "Monthly sales performance over the last 6 months",
            icon: "bi-graph-up",
            accentColor: "#38bdf8"
        },
        {
            title: "Daily Website Traffic",
            chart: <Bar data={userData[selectedUser].barChartData} options={{ responsive: true, maintainAspectRatio: false }} />,
            description: "Visitor count per day of the week",
            icon: "bi-bar-chart",
            accentColor: "#a855f7"
        },
        {
            title: "Product Categories",
            chart: <Pie data={userData[selectedUser].pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />,
            description: "Distribution across product categories",
            icon: "bi-pie-chart",
            accentColor: "#f59e0b"
        },
        {
            title: "Traffic Sources",
            chart: <Doughnut data={userData[selectedUser].doughnutChartData} options={{ responsive: true, maintainAspectRatio: false }} />,
            description: "Where your visitors are coming from",
            icon: "bi-diagram-3",
            accentColor: "#10b981"
        },
    ];

    const toggleCardExpansion = (index) => {
        setExpandedCard(expandedCard === index ? null : index);
    };

    const renderDashboardContent = () => {
        return (
            <div className="dashboard">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="h4">Analytics Dashboard</h2>
                    <div className="d-flex align-items-center">
                        <select className="form-select me-3" value={selectedUser} onChange={handleUserChange}>
                            <option value="User1">User 1</option>
                            <option value="User2">User 2</option>
                        </select>
                        <div className="btn-group">
                            <button className="btn btn-sm btn-outline-primary">Today</button>
                            <button className="btn btn-sm btn-outline-primary active">Week</button>
                            <button className="btn btn-sm btn-outline-primary">Month</button>
                            <button className="btn btn-sm btn-outline-primary">Year</button>
                        </div>
                    </div>
                </div>

                <div className="row g-3">
                    {cards.map((card, index) => (
                        <div key={index} className={`${expandedCard === index ? 'col-md-12' : cardSizes[index]} mb-3`}>
                            <div
                                className="card border-0 rounded-4 overflow-hidden shadow-sm"
                                style={getCardStyle(index)}
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                                onClick={() => toggleCardExpansion(index)}
                            >
                                <div className="card-header border-0 d-flex justify-content-between align-items-center" style={{ background: 'transparent' }}>
                                    <div>
                                        <h5 className="card-title mb-0" style={{ color: card.accentColor }}>{card.title}</h5>
                                        <small className="text-muted">{card.description}</small>
                                    </div>
                                    <div className="d-flex">
                                        <button className="btn btn-sm btn-light rounded-circle me-2">
                                            <i className="bi bi-three-dots-vertical"></i>
                                        </button>
                                        <button className="btn btn-sm btn-light rounded-circle">
                                            <i className={`bi ${expandedCard === index ? 'bi-fullscreen-exit' : 'bi-fullscreen'}`}></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body" style={{ height: expandedCard === index ? "500px" : "250px" }}>
                                    {card.chart}
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="badge bg-success rounded-pill">
                                            <i className="bi bi-arrow-up me-1"></i>
                                            12% increase
                                        </span>
                                        <button className="btn btn-sm btn-outline-primary">Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="row g-3 mt-2">
                    {["Users", "Sessions", "Conversion", "Avg. Duration"].map((metric, index) => (
                        <div key={index} className="col-md-3 col-6 mb-3">
                            <div 
                                className="card border-0 rounded-4 h-100 shadow-sm"
                                style={{
                                    ...getCardStyle(`kpi-${index}`),
                                    background: `linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)`
                                }}
                                onMouseEnter={() => setHoveredCard(`kpi-${index}`)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 className="text-muted mb-1">{metric}</h6>
                                            <h3 className="mb-0">
                                                {index === 0 ? "1,249" : 
                                                index === 1 ? "2,892" : 
                                                index === 2 ? "5.2%" : 
                                                "3m 12s"}
                                            </h3>
                                        </div>
                                        <div className={`bg-${index === 0 ? "primary" : 
                                                            index === 1 ? "success" : 
                                                            index === 2 ? "warning" : 
                                                            "info"} p-2 rounded-circle text-white`}>
                                            <i className={`bi bi-${index === 0 ? "people" : 
                                                                index === 1 ? "activity" : 
                                                                index === 2 ? "cart" : 
                                                                "clock"}`}></i>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <div className={`text-${index % 2 === 0 ? "success" : "danger"} d-flex align-items-center`}>
                                            <i className={`bi bi-arrow-${index % 2 === 0 ? "up" : "down"} me-1`}></i>
                                            <span>{index % 2 === 0 ? "+8.3%" : "-2.7%"} vs last week</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="d-flex">
            <div className="bg-dark min-vh-100" style={{ width: "220px", position: "fixed", left: 0, top: 0, bottom: 0 }}>
                <div className="d-flex flex-column h-100">
                    <h2 className="text-white text-center py-3">Logo</h2>
                    <ul className="nav flex-column px-2">
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link text-white py-2 mb-1 rounded">
                                <i className="bi bi-speedometer2 me-2"></i>Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/tasks" className="nav-link text-white py-2 mb-1 rounded">
                                <i className="bi bi-check2-square me-2"></i>Tasks
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/reports" className="nav-link text-white py-2 mb-1 rounded">
                                <i className="bi bi-file-earmark-text me-2"></i>Reports
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/settings" className="nav-link text-white py-2 mb-1 rounded">
                                <i className="bi bi-gear me-2"></i>Settings
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="flex-grow-1">
                <div className="p-4">
                    {window.location.pathname === "/dashboard" ? renderDashboardContent() : <Outlet />}
                </div>
            </div>
        </div>
    );
};

export default Layout;