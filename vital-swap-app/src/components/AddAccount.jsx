import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddAccountForm.css';

const CreateAccount = ({ userId }) => {

    const nigerianBanks = [
  // Commercial Banks with International Authorization
  { id: 'access-ng', name: 'Access Bank', code: '044', type: 'International' },
  { id: 'fidelity-ng', name: 'Fidelity Bank', code: '070', type: 'International' },
  { id: 'fcmb-ng', name: 'First City Monument Bank (FCMB)', code: '214', type: 'International' },
  { id: 'firstbank-ng', name: 'First Bank of Nigeria', code: '011', type: 'International' },
  { id: 'gtb-ng', name: 'Guaranty Trust Bank (GTB)', code: '058', type: 'International' },
  { id: 'uba-ng', name: 'United Bank for Africa (UBA)', code: '033', type: 'International' },
  { id: 'zenith-ng', name: 'Zenith Bank', code: '057', type: 'International' },

  // Commercial Banks with National Authorization
  { id: 'citibank-ng', name: 'Citibank Nigeria', code: '009', type: 'National' },
  { id: 'ecobank-ng', name: 'Ecobank Nigeria', code: '050', type: 'National' },
  { id: 'heritage-ng', name: 'Heritage Bank', code: '030', type: 'National' },
  { id: 'keystone-ng', name: 'Keystone Bank', code: '082', type: 'National' },
  { id: 'optimus-ng', name: 'Optimus Bank', code: '107', type: 'National' },
  { id: 'polaris-ng', name: 'Polaris Bank', code: '076', type: 'National' },
  { id: 'premium-ng', name: 'Premium Trust Bank', code: '105', type: 'National' },
  { id: 'stanbic-ng', name: 'Stanbic IBTC Bank', code: '039', type: 'National' },
  { id: 'standard-ng', name: 'Standard Chartered Bank', code: '068', type: 'National' },
  { id: 'sterling-ng', name: 'Sterling Bank', code: '232', type: 'National' },
  { id: 'titan-ng', name: 'Titan Trust Bank', code: '102', type: 'National' },
  { id: 'union-ng', name: 'Union Bank of Nigeria', code: '032', type: 'National' },
  { id: 'unity-ng', name: 'Unity Bank', code: '215', type: 'National' },
  { id: 'wema-ng', name: 'Wema Bank', code: '035', type: 'National' },

  // Commercial Banks with Regional Authorization
  { id: 'globus-ng', name: 'Globus Bank', code: '103', type: 'Regional' },
  { id: 'parallex-ng', name: 'Parallex Bank', code: '104', type: 'Regional' },
  { id: 'providus-ng', name: 'Providus Bank', code: '101', type: 'Regional' },
  { id: 'suntrust-ng', name: 'SunTrust Bank', code: '100', type: 'Regional' },

  // Non-Interest Banks (Islamic Banking)
  { id: 'jaiz-ng', name: 'Jaiz Bank', code: '301', type: 'Non-Interest' },
  { id: 'lotus-ng', name: 'Lotus Bank', code: '303', type: 'Non-Interest' },
  { id: 'taj-ng', name: 'TAJBank', code: '302', type: 'Non-Interest' }
];


  const [formData, setFormData] = useState({
    accountNumber: '',
    accountHolder: '',
    bankName: '',
    currency: 'USD',
    settlementType: 'standard'
  });

  const [status, setStatus] = useState({ loading: false, error: '', success: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.error) setStatus({ ...status, error: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: false });

    try {
      const payload = { ...formData, userId };
      const response = await axios.post('http://localhost:8000/api/accounts/create', {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: payload
      }
      );

      setStatus({ loading: false, error: '', success: true });
      console.log("Account Created:", response.data);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to link bank account.";
      setStatus({ loading: false, error: msg, success: false });
    }
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
            <select
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              className="bank-select"
              required
            >
              <option value="">Select a Nigerian Bank</option>

              {['International', 'National', 'Regional', 'Non-Interest'].map(category => (
                <optgroup key={category} label={`${category} Banks`}>
                  {nigerianBanks
                    .filter(bank => bank.type === category)
                    .map(bank => (
                      <option key={bank.id} value={bank.name}>
                        {bank.name}
                      </option>
                    ))
                  }
                </optgroup>
              ))}
            </select>
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