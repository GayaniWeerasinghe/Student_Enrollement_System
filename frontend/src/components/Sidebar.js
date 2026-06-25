import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const logout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate('/')
        window.location.reload();
    };

    return (
        <div className="sidebar">
            <h2>Admin Panel</h2>
            <ul>
                <li><Link className="text-decoration-none text-white" to="/">Dashboard</Link></li>
                <li><Link className="text-decoration-none text-white" to="/students">Students</Link></li>
                <li>Courses</li>
                <li>Enrollments</li>
                <li><Link className="text-white text-decoration-none" onClick={logout}>Logout</Link></li>
            </ul>
        </div>
    )
}

export default Sidebar;