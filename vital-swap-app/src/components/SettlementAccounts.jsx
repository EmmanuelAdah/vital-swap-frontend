import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import InfoCard from './InfoCard';
import AccountCard from './AccountCard';
import HelpCard from './HelpCard';
import '../styles/SettlementAccounts.css';

const SettlementAccounts = () => {
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
            <button className="btn-primary">
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
    </div>
  );
};

export default SettlementAccounts;
