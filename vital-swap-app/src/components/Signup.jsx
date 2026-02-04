import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';
import { saveSessionWithTimer } from '../utils/auth.jsx';
import axios from "axios";

const BASE_URI = import.meta.env.VITE_BASE_URI;

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', role: '', password: '', confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URI}/api/auth/signup`, formData);
    saveSessionWithTimer(response.data.user, response.data.token);
    window.location.href = "/accouns";
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join our community today</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-banner">{error}</div>}

          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" required />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" required />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@company.com" required />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="">Select your role</option>
              <option value="admin">ADMIN</option>
              <option value="user">USER</option>
            </select>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" required />
          </div>
           <p className="auth-footer">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Processing...' : 'Create Account'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Signup;