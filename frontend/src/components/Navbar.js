import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const username = localStorage.getItem("username");

    return (
        <nav
            className="navbar navbar-expand-lg"
            style={{
                backgroundColor: "#efeff1",
                color: "#1f2937",
                zIndex: 1000
            }}>
            <div className="container-fluid">
                <span className="navbar-brand text-dark">
                    Student Enrollment System
                </span>
                <div className="ms-auto">
                    {!isLoggedIn ? (
                        <>
                            <Link
                                to="/register"
                                className="me-3 text-dark text-decoration-none"
                            >
                                Register
                            </Link>

                            <Link
                                to="/login"
                                className="text-dark text-decoration-none"
                            >
                                Login
                            </Link>
                        </>
                    ) : (
                        <>
                        <i className="fa-solid fa-user fa-lg"></i>&nbsp;&nbsp;
                        <span className="text-dark">
                            {username}
                        </span>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;