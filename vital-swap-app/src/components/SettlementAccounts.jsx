import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import InfoCard from './InfoCard';
import AccountCard from './AccountCard';
import HelpCard from './HelpCard';
import '../styles/SettlementAccounts.css';
import axios from "axios";

const BASE_URL= import.meta.env.VITE_BASE_URI

  const currencyList = [
    { code: "NGN", label: "NGN (₦) - Nigerian Naira" },
    { code: "USD", label: "USD ($) - US Dollar" },
    { code: "EUR", label: "EUR (€) - Euro" },
    { code: "GBP", label: "GBP (£) - British Pound" },
    { code: "ZAR", label: "ZAR (R) - South African Rand" },
    { code: "GHS", label: "GHS (₵) - Ghanaian Cedi" },
    { code: "KES", label: "KES (KSh) - Kenyan Shilling" },
    { code: "EGP", label: "EGP (E£) - Egyptian Pound" },
    { code: "MAD", label: "MAD (DH) - Moroccan Dirham" },
    { code: "DZD", label: "DZD (DA) - Algerian Dinar" },
    { code: "MUR", label: "MUR (Rs) - Mauritian Rupee" }
  ];

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

const SettlementAccounts = () => {
  const [isAddAccount, setIsAddAccount] = useState(false);
  const [bankData, setBankData] = useState({
    bankName: '',
    accountHolder: '',
    accountNumber: '',
    currency: '',
    settlementType: '',
  })

  const [accounts, setAccounts] = useState([
    {
      id: 1,
      bankName: 'GTBank Plc',
      isPrimary: true,
      accountHolder: 'Akinsola Jegede Enterprises',
      accountNumber: '0123456789',
      verified: true,
      settlementType: 'NGN Settlement',
      isLocal: true,
    },
    {
      id: 2,
      bankName: 'Zenith Bank',
      isPrimary: false,
      accountHolder: 'Akinsola Jegede Enterprises',
      accountNumber: '2008912345',
      verified: true,
      settlementType: 'NGN Settlement',
      isLocal: true,
    },
    {
      id: 3,
      bankName: 'Mercury (Evolve Bank & Trust)',
      isPrimary: false,
      accountHolder: 'Akinsola Jegede Inc.',
      accountNumber: '**** 8821',
      verified: true,
      settlementType: 'International Wire',
      currency: 'USD',
      isLocal: true,
    }
  ]);


   const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({ loading: true, error: '', success: false });

    try {
      const payload = { ...bankData, userId };
      const response = await axios.post(`${BASE_URL}/accounts/create`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: payload
        }
      );

    } catch (err) {
      const msg = err.response?.data?.message || "Failed to link bank account.";
      setStatus({ loading: false, error: msg, success: false });
    }
  };

  const handleSetPrimary = (accountId) => {
    setAccounts(accounts.map(acc => ({
      ...acc,
      isPrimary: acc.id === accountId
    })));
  };

  const handleDelete = (accountId) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      setAccounts(accounts.filter(acc => acc.id !== accountId));

    }
  };

  const handleEdit = (accountId) => {
    console.log('Edit account:', accountId);
    // Implement edit functionality
  };

  const handleBankData = (e) => {
      setBankData({ ...bankData, [e.target.name]: e.target.value });
  }
  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        <Header />

        <div className="content-wrapper">
          <div className="page-header">
            <div className="page-header-content">
              <h1 className="page-title">Settlement Accounts</h1>
              <p className="page-description">
                Manage the bank accounts where your settlements are paid out.
              </p>
            </div>
            <button className="btn-primary" onClick={() => setIsAddAccount(true)} aria-label="Add new account">
              <span className="btn-icon">+</span>
              Add New Account
            </button>
          </div>
          <InfoCard />

        <div className="accounts-section">
            <h2 className="section-title">Your Linked Accounts</h2>

            <div className="accounts-list">
              {accounts.map(account => (
                <AccountCard
                  key={account.id}
                  account={account}
                  onSetPrimary={handleSetPrimary}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>
        </div>
          <HelpCard />
        </div>

        <footer className="footer">
          © 2025 VitalSwap Inc. All rights reserved. Privacy · Terms
        </footer>
      </div>
      {isAddAccount && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Dark Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            onClick={() => setIsAddAccount(false)}
          />

          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">

            {/* Gradient Header */}
            <div className="bg-linear-to-r from-blue-600 to-blue-500 p-8 text-center text-white">
              <h2 className="text-2xl font-semibold">Payment Destination</h2>
              <p className="text-blue-100 text-sm mt-1 opacity-90">Securely add a new bank account</p>
            </div>

            {/* Form Fields */}
            <div className="p-8 space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bank Name</label>
                <input
                  list="bank-options"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700"
                  name="bankName"
                  value={bankData.bankName}
                  onChange={handleBankData}
                  placeholder="Select or type bank name..."
                  required
                />

                <datalist id="bank-options">
                  {nigerianBanks.map(bank => (
                    <option key={bank.id} value={bank.name} />
                  ))}
                </datalist>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account Holder</label>
                <input
                  type="text"
                  placeholder="Full Legal Name"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700"
                />
              </div>

              <div className="space-y-1 relative">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account Number</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="0000 000 1000"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-gray-700 tracking-wider"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </span>
                </div>
              </div>
               <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Currency
                </label>
                <input
                  list="currency-options"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700"
                  name="currency"
                  value={bankData.currency}
                  onChange={handleBankData}
                  placeholder="Select or type currency..."
                  required
                />

                <datalist id="currency-options">
                  {currencyList.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.label}
                    </option>
                  ))}
                </datalist>
              </div>
            </div>

            {/* Form Actions */}
            <div className="p-8 pt-0 flex items-center gap-4">
              <button
                onClick={() => setIsAddAccount(false)}
                className="flex-1 py-3 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                Save Details
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettlementAccounts;
