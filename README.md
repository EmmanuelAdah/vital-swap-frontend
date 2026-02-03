#VitalSwap Frontend

--A modern React-based frontend application for the VitalSwap platform, focused on managing settlement bank accounts for payouts.
The application follows a modular component architecture and a clean fintech-style user interface.

##📌 Overview

The Settlement Accounts module allows users to manage the bank accounts where settlements and payouts are sent. It supports both local and international accounts, verification status, and primary account selection.

This frontend is designed to be easily extensible and ready for backend/API integration.

✨ Features

View linked settlement bank accounts

Set a primary settlement account

Support for local (NGN) and international (USD) settlements

Account verification status indicators

Edit and delete account actions

Confirmation handling for destructive actions

Modular and reusable React components

Clean, responsive, fintech-inspired UI

🧩 Architecture & Component Structure

The application uses a component-driven structure for maintainability and scalability.

src/
├── components/
│   ├── Sidebar.jsx          # Navigation sidebar
│   ├── Header.jsx           # Top navigation/header
│   ├── InfoCard.jsx         # Informational banner
│   ├── AccountCard.jsx     # Individual settlement account card
│   └── HelpCard.jsx         # Support/help section
├── pages/
│   └── SettlementAccounts.jsx
├── styles/
│   └── SettlementAccounts.css

🖥️ Settlement Accounts Page

The SettlementAccounts page is the core of this module and is responsible for:

Managing account state using React hooks

Rendering linked settlement accounts dynamically

Handling user actions such as setting a primary account, editing, and deleting accounts

Displaying contextual information and support guidance

Sample Account Data Structure
{
  id: 1,
  bankName: 'GTBank Plc',
  isPrimary: true,
  accountHolder: 'Akinsola Jegede Enterprises',
  accountNumber: '0123456789',
  verified: true,
  settlementType: 'NGN Settlement'
}

🔧 Core Functionality

Set Primary Account
Ensures only one settlement account can be marked as primary at any time.

Delete Account
Prompts user confirmation before removing an account.

Edit Account
Placeholder logic included, ready for modal or route-based implementation.

🎨 Styling & UI

Custom CSS (no external UI framework)

Responsive layout optimized for dashboard use

Card-based design with clear visual hierarchy

Fintech-inspired color palette and spacing

🚀 Getting Started
Prerequisites

Node.js (v16+ recommended)

npm or yarn

Installation
git clone https://github.com/EmmanuelAdah/vital-swap-frontend.git
cd vital-swap-frontend
npm install

Run the Application
npm start


The app will start locally and be available in your browser.

🛠️ Technology Stack

React

JavaScript (ES6+)

Custom CSS

Component-based architecture

🔮 Future Enhancements

Backend API integration

Add/Edit settlement account modal

Authentication and role-based access control

Improved mobile responsiveness

Dark mode support

Form validation and error handling

📄 License

© 2025 VitalSwap Inc.
All rights reserved.
