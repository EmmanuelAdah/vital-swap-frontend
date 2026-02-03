import React from 'react';
import '../styles/HelpCard.css';

const HelpCard = () => {
  return (
    <div className="help-card">
      <h3 className="help-title">Need help?</h3>
      <p className="help-text">
        Having trouble adding an account or receiving settlements?
      </p>
      <button className="btn-help">Contact Support</button>
    </div>
  );
};

export default HelpCard;
