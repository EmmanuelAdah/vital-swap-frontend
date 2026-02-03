import React from 'react';
import {} from 'lucide-react'
import '../styles/AccountCard.css';

const AccountCard = ({ account, onSetPrimary, onDelete, onEdit }) => {
  const handleCopyAccount = () => {
    navigator.clipboard.writeText(account.accountNumber.replace(/\*/g, ''));
    // You can add a toast notification here
  };

  const getBankIcon = (bankName) => {
    if (bankName.includes('Mercury')) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#3B82F6"/>
          <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    }
    return <span className="material-icons">account_balance</span>;
  };

  return (
    <div className="account-card">
      <div className="account-card-header">
        <div className="bank-icon">
          {getBankIcon(account.bankName)}
        </div>
        <div className="bank-info">
          <div className="bank-name-row">
            <h3 className="bank-name">{account.bankName}</h3>
            {account.isPrimary && <span className="primary-badge">PRIMARY</span>}
          </div>
          <p className="account-holder">{account.accountHolder}</p>
        </div>
        <div className="account-actions">
          <button
            className="icon-btn"
            onClick={() => onEdit(account.id)}
            aria-label="Edit account"
          >
            <span className="material-icons">edit</span>
          </button>
          <button
            className="icon-btn"
            onClick={() => onDelete(account.id)}
            aria-label="Delete account"
          >
            <span className="material-icons">delete</span>
          </button>
        </div>
      </div>

      <div className="account-card-body">
        <div className="account-number-row">
          <span className="account-number">{account.accountNumber}</span>
          <button
            className="copy-btn"
            onClick={handleCopyAccount}
            aria-label="Copy account number"
          >
            <span className="material-icons">content_copy</span>
          </button>
        </div>

        <div className="account-card-footer">
          <div className="account-status">
            <span className="verified-badge">
              <span className="verified-dot"></span>
              Verified
            </span>
            <span className="settlement-type">{account.settlementType}</span>
            {account.currency && <span className="currency-badge">{account.currency}</span>}
          </div>

          {!account.isPrimary && (
            <button
              className="set-primary-btn"
              onClick={() => onSetPrimary(account.id)}
            >
              Set as Primary
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
