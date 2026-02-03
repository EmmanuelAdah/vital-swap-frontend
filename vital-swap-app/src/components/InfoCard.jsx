import React from 'react';
import {Info} from 'lucide-react';
import '../styles/InfoCard.css';

const InfoCard = () => {
  return (
    <div className="info-card">
      <div className="info-icon">
        <span className="material-icons"><Info /></span>
      </div>
      <div className="info-content">
        <h3 className="info-title">About Settlement Accounts</h3>
        <p className="info-text">
          Settlement accounts are external bank accounts where you receive payouts from your wallet.
          Ensure the account name matches your registered business name to avoid delays.
          Changes to settlement accounts may require additional verification.
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
