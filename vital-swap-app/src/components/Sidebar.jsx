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

        <div className="menu-section mb-6">
          {/* SECTION LABEL */}
          <div className="px-6 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Configuration
          </div>

          {/* SETTINGS PARENT ITEM */}
          <div
            className={`group flex items-center justify-between px-6 py-3 cursor-pointer transition-colors ${
              settingsExpanded ? 'text-blue-600' : 'text-gray-500 hover:bg-gray-50'
            }`}
            onClick={() => setSettingsExpanded(!settingsExpanded)}
          >
            <div className="flex items-center gap-4">
              {/* Settings Icon */}
              <Settings size={20} strokeWidth={2} />
              <span className="text-[15px] font-medium">Settings</span>
            </div>

            {/* Chevron - Rotates when expanded */}
            <div className={`transition-transform duration-300 ${settingsExpanded ? 'rotate-180' : ''}`}>
              <ChevronDown size={18} className="text-gray-400" />
            </div>
          </div>

          {/* SUBMENU ITEMS */}
          {settingsExpanded && (
            <div className="flex flex-col mt-1">
              {configItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`relative flex items-center pl-16 py-2.5 text-[14px] cursor-pointer transition-all ${
                    activeItem === item.id 
                      ? 'text-blue-600 font-semibold bg-blue-50/60' 
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  {/* Vertical indicator for active item */}
                  {activeItem === item.id && (
                    <div className="absolute left-0 w-1 h-full bg-blue-600 rounded-r-full" />
                  )}
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

      <div className="sidebar-footer flex items-center gap-3 "
           onClick={handleLogout}
      >
        <button className="logout-btn border-t border-gray-100 justify-center">
          <span className="material-icons logout-icon font-semibold hover:bg-red-50">logout</span>
          <span ><LogOut /></span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
