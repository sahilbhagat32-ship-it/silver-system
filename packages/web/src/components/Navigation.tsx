import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

export function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          💪 Diet Calculator Pro
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/calculator" className="nav-link">Calculator</Link>
          </li>
          <li className="nav-item">
            <Link to="/results" className="nav-link">Results</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
