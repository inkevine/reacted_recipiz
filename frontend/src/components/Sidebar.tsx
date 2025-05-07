import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUtensils, FaHeart, FaList, FaRobot } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
      <div className="sidebar-header">
        <span className="logo-icon">🍳</span>
        <span className="logo">Ingrido</span>
      </div>

      <Link to="/" className={isActive('/') ? 'active' : ''}>
        <FaHome />
        <span className="icon-text">Home</span>
      </Link>

      <Link to="/my-recipes" className={isActive('/my-recipes') ? 'active' : ''}>
        <FaUtensils />
        <span className="icon-text">My Recipes</span>
      </Link>

      <Link to="/favorites" className={isActive('/favorites') ? 'active' : ''}>
        <FaHeart />
        <span className="icon-text">Favorites</span>
      </Link>

      <Link to="/categories" className={isActive('/categories') ? 'active' : ''}>
        <FaList />
        <span className="icon-text">Categories</span>
      </Link>

      <Link to="/assistant" className={isActive('/assistant') ? 'active' : ''}>
        <FaRobot />
        <span className="icon-text">Assistant</span>
      </Link>

      <button
        className="expand-button"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? '←' : '→'}
      </button>
    </div>
  );
};

export default Sidebar; 