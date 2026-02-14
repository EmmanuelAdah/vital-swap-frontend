import React, {useState} from 'react';
import '../styles/Header.css';
import { Sun } from 'lucide-react';

const Header = () => {
  const [userData, setUserData] = useState(() => {

  const savedUser = JSON.parse(sessionStorage.getItem('user'));

  const getAvatar = (name, url) => {
      if (url) return url;
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || '';
    };

    return {
      name: savedUser?.name || '',
      email: savedUser?.email || '',
      role: savedUser?.role === 'admin'.ignoreCase ? 'Admin' : 'User',
      avatar: getAvatar(savedUser?.name, savedUser?.imageUrl)
    };
  });


  const handleToggleTheme = () => {
    document.documentElement.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light');

  }
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
          <span className="material-icons"><Sun /></span>
        </button>
        <div className="user-profile">
          <div className="user-info">
            <div className="user-name">{userData?.name}</div>
            <div className="user-role">{userData?.role}</div>
          </div>
          <div className="user-avatar">{userData?.avatar}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
