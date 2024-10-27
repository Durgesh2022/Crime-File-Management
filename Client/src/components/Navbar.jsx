import React from "react";
import "./Navbar.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        // setToken("");
        navigate("/");
    };
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <h1 className="navbar-title">CRIME FILE MANAGEMENT SYSTEM</h1>
                <div className="navbar-buttons">
                    <button className="navbar-button">Home</button>
                    <button className="navbar-button" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
