import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser } from 'react-icons/fa';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="top-navbar">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/" className="brand-name">
            Ingrido
          </Link>

          <form onSubmit={handleSearch} className="search-container">
            <div className="position-relative">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="search-icon" />
            </div>
          </form>

          <div className="d-flex align-items-center">
            <Link to="/profile" className="profile-icon">
              <FaUser />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 