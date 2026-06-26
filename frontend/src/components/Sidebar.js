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
                <li><Link className="text-decoration-none text-white" to="/"><i className="fa fa-tachometer" aria-hidden="true"></i>&nbsp;&nbsp;Dashboard</Link></li>
                <li><Link className="text-decoration-none text-white" to="/students"><i className="fa fa-graduation-cap" aria-hidden="true"></i>&nbsp;&nbsp;Students</Link></li>
                <li><Link className="text-decoration-none text-white" to="/courses"><i className="fa fa-book" aria-hidden="true"></i>&nbsp;&nbsp;Courses</Link></li>
                <li><i className="fa-solid fa-circle-plus"></i>&nbsp;&nbsp;Enrollments</li>
                <li><Link className="text-white text-decoration-none" onClick={logout}><i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;&nbsp;Logout</Link></li>
            </ul>
        </div>
    )
}

export default Sidebar;