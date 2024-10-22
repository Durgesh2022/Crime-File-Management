import React from 'react';
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-title">CRIME FILE MANAGEMENT SYSTEM</h1>
        <div className="navbar-buttons">
          <button className="navbar-button">Home</button>
          <button className="navbar-button">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
