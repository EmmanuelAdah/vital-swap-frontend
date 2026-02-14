import React, { useState } from 'react';
import {
  Settings,
  LayoutDashboard,
  Landmark,
  ScrollText,
  Code,
  Link2,
  ShieldCheck,
  Webhook,
  ChevronDown,
  LogOut
} from 'lucide-react';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('settlement-accounts');
  const [settingsExpanded, setSettingsExpanded] = useState(true);

  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
    { id: 'transactions', icon: <ScrollText />, label: 'Transactions' },
    { id: 'accounts', icon: <Landmark />, label: 'Accounts' },
    { id: 'payment-link', icon: <Link2 />, label: 'Payment Link' },
  ];

  const configItems = [
    { id: 'general', label: 'General' },
    { id: 'profile-team', label: 'Profile & Team' },
    { id: 'settlement-accounts', label: 'Settlement Accounts' },
    { id: 'security', label: 'Security' },
  ];

  const bottomItems = [
    { id: 'webhooks', icon: <Webhook />, label: 'Webhooks' },
    { id: 'due-diligence', icon: <ShieldCheck />, label: 'Due Diligence' },
    { id: 'api-docs', icon: <Code />, label: 'API Docs' },
  ];

  const handleLogout=()=> {
      sessionStorage.removeItem('user')
      window.location.href='/'
  }

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
            <span className="menu-text"><Settings /></span>
            <span className="material-icons menu-icon">Settings</span>
            <span className="material-icons expand-icon">
              {settingsExpanded ? <ChevronDown /> : <ChevronDown />}
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

      <div className="sidebar-footer" onClick={handleLogout}>
        <button className="logout-btn">
          <span className="material-icons logout-icon">logout</span>
          <span ><LogOut /></span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
