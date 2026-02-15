import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddAccountForm.css';

const CreateAccount = ({ userId }) => {

  const [status, setStatus] = useState({ loading: false, error: '', success: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.error) setStatus({ ...status, error: '' });
  };

  return (
    <div className="bank-card-container">
      <div className="bank-card">
        <div className="bank-card-header">
          <h3>Link Bank Account</h3>
          <p>Add your settlement details securely</p>
        </div>

        <form onSubmit={handleSubmit} className="bank-form">
          {status.error && <div className="alert error">{status.error}</div>}
          {status.success && <div className="alert success">Bank account linked successfully!</div>}

          <div className="input-group">
            <label>Bank Name</label>

          </div>

          <div className="input-group">
            <label>Account Number</label>
            <input
              type="text"
              name="accountNumber"
              placeholder="000123456789"
              value={formData.accountNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Account Holder Name</label>
            <input
              type="text"
              name="accountHolder"
              placeholder="Full Name as it appears on bank"
              value={formData.accountHolder}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-split">
            <div className="input-group">
              <label>Currency</label>
              <select name="currency" value={formData.currency} onChange={handleChange}>
                <option value="NGN">NGN (₦)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="NGN">NGN (₦)</option>
                <option value="ZAR">ZAR (R)</option>
                <option value="GHS">GHS (₵)</option>
                <option value="KES">KES (KSh)</option>
                <option value="EGP">EGP (E£)</option>
                <option value="MAD">MAD (DH)</option>
                <option value="DZD">DZD (DA)</option>
                <option value="MUR">MUR (Rs)</option>
              </select>
            </div>

            <div className="input-group">
              <label>Settlement</label>
              <select name="settlementType" value={formData.settlementType} onChange={handleChange}>
                <option value="standard">Standard</option>
                <option value="instant">Instant</option>
              </select>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={status.loading}>
            {status.loading ? 'Verifying...' : 'Link Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;