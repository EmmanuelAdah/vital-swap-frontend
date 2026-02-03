import React, { useState } from 'react';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('settlement-accounts');
  const [settingsExpanded, setSettingsExpanded] = useState(true);

  const menuItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'transactions', icon: 'description', label: 'Transactions' },
    { id: 'accounts', icon: 'business', label: 'Accounts' },
    { id: 'payment-link', icon: 'link', label: 'Payment Link' },
  ];

  const configItems = [
    { id: 'general', label: 'General' },
    { id: 'profile-team', label: 'Profile & Team' },
    { id: 'settlement-accounts', label: 'Settlement Accounts' },
    { id: 'security', label: 'Security' },
  ];

  const bottomItems = [
    { id: 'webhooks', icon: 'webhook', label: 'Webhooks' },
    { id: 'due-diligence', icon: 'verified_user', label: 'Due Diligence' },
    { id: 'api-docs', icon: 'code', label: 'API Docs' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="white"/>
            </svg>
          </div>
          <span className="logo-text">VitalSwap</span>
        </div>
      </div>

      <div className="sidebar-content">
        <div className="menu-section">
          <div className="menu-label">MAIN MENU</div>
          {menuItems.map(item => (
            <div
              key={item.id}
              className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => setActiveItem(item.id)}
            >
              <span className="material-icons menu-icon">{item.icon}</span>
              <span className="menu-text">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="menu-section">
          <div className="menu-label">CONFIGURATION</div>
          <div
            className={`menu-item expandable ${settingsExpanded ? 'expanded' : ''}`}
            onClick={() => setSettingsExpanded(!settingsExpanded)}
          >
            <span className="material-icons menu-icon">settings</span>
            <span className="menu-text">Settings</span>
            <span className="material-icons expand-icon">
              {settingsExpanded ? 'expand_less' : 'expand_more'}
            </span>
          </div>

          {settingsExpanded && (
            <div className="submenu">
              {configItems.map(item => (
                <div
                  key={item.id}
                  className={`submenu-item ${activeItem === item.id ? 'active' : ''}`}
                  onClick={() => setActiveItem(item.id)}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="menu-section">
          {bottomItems.map(item => (
            <div
              key={item.id}
              className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => setActiveItem(item.id)}
            >
              <span className="material-icons menu-icon">{item.icon}</span>
              <span className="menu-text">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        <button className="logout-btn">
          <span className="material-icons logout-icon">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
