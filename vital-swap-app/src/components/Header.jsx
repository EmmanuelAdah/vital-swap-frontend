import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="breadcrumb">
        <span className="breadcrumb-item">Settings</span>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-item active">Settlement Accounts</span>
      </div>

      <div className="header-right">
        <div className="status-badge">
          <span className="status-dot"></span>
          ACTIVE
        </div>
        <button className="theme-toggle" aria-label="Toggle theme">
          <span className="material-icons">dark_mode</span>
        </button>
        <div className="user-profile">
          <div className="user-info">
            <div className="user-name">Akinsola Jegede</div>
            <div className="user-role">Admin</div>
          </div>
          <div className="user-avatar">AJ</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
