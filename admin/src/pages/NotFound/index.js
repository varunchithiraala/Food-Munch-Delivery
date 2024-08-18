import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const NotFound = () => {
  // Hook to programmatically navigate
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1 className="not-found-heading">404</h1>
      <p className="not-found-description">
        Oops! The page you are looking for does not exist.
      </p>
      <button
        className="home-button"
        onClick={() => navigate('/')}
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
