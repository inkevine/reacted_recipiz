import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import './Signup.css';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordcon: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.passwordcon) {
      setError('Passwords do not match');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      navigate('/');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to create an account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="signup-card">
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="inputbox">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="username">Username</label>
              </div>

              <div className="inputbox">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="inputbox">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="password">Password</label>
              </div>

              <div className="inputbox">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  id="passwordcon"
                  name="passwordcon"
                  value={formData.passwordcon}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="passwordcon">Confirm Password</label>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            <div className="text-center mt-3">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="text-decoration-none">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup; 