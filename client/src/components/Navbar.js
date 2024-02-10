import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          Hackthon
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/products" className="nav-link">
          Products
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
