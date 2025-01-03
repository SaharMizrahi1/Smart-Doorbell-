import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
  <div className='welcome-page'>
    <div className='welcome-container'>
      <h1>Welcome to the Smart Doorbell App!</h1>
      <p>
        Upgrade your home security with our Smart Doorbell App! Receive instant notifications, 
        view footage, and recognize familiar faces with advanced facial recognition technology. 
        Stay connected to your front door, no matter where you are.
      </p>
      <div className='get-started'>
        <Link to="/login">
          <button>Get Started</button>
        </Link>
    </div>
    </div>
  </div>
  );
};

export default Welcome;
