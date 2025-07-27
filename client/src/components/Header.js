// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('userToken'); // temp auth check

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <header className="header">
      <h1 className="logo">Eduverse</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/contact">Contact</Link>

        {!isAuthenticated ? (
          <Link to="/login" className="login-btn">Login</Link>
        ) : (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        )}
      </nav>
    </header>
  );
}

export default Header;
