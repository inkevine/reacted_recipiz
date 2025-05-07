import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="content-card">
            <h2>Welcome to Ingrido</h2>
            <p>Your personal recipe management system</p>
            
            <div className="row mt-4">
              <div className="col-md-4">
                <div className="feature-card">
                  <h3>My Recipes</h3>
                  <p>Manage your personal collection of recipes</p>
                  <Link to="/my-recipes" className="btn btn-primary">View Recipes</Link>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="feature-card">
                  <h3>Categories</h3>
                  <p>Organize recipes by categories</p>
                  <Link to="/categories" className="btn btn-primary">Browse Categories</Link>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="feature-card">
                  <h3>Recipe Assistant</h3>
                  <p>Get help with your cooking</p>
                  <Link to="/assistant" className="btn btn-primary">Try Assistant</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 