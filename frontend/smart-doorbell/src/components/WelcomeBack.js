import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const WelcomeBack = () => {
  const location = useLocation();
  const username = location.state?.username || "User"; // Default to "User" if no username is provided

  return (
    <div className="welcome-back">
      <h1>Welcome Back, {username}!</h1>
      <p>Select an action to get started:</p>
      <div className="actions">
        <Link to="/FamilyMemberUpload">
          <button>Add Family Member</button>
        </Link>

        <div className="telegram-updates">
          <p>
            To start receiving updates on Telegram, please start a conversation with
            the smart doorbell bot by clicking the button below.
          </p>
          <a
            href="https://t.me/your_bot_name" //replace with your public bot link
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Receive Updates on Telegram</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBack;
