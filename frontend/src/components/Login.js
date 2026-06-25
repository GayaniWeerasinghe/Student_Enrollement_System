import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:8070/auth/login",
                {
                    username,
                    password
                }
            );
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem(
                "token",
                res.data.token
            );
            alert("Login Successful");
            navigate('/');
            window.location.reload();
        } catch (err) {
            alert("Invalid Credentials");
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center" style={{marginTop:"150px"}}>
                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="text-center mb-4">
                                Login
                            </h3>
                            <form onSubmit={login}>
                                <div className="mb-3">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 d-flex">
                                    <p style={{fontSize:"13px"}}>Don't you have an account?</p>&nbsp;
                                    <a style={{fontSize:"13px"}} href="/register">Register</a>
                                </div>
                                <button
                                    type="submit"
                                    className="btn w-100"
                                    style={{
                                        backgroundColor: "#1f2937",
                                        color: "white"
                                    }}
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;