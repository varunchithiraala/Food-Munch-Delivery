import React from 'react';
import './index.css';

const Header = () => {
  // Function to handle button click and navigate to the menu section
  const handleViewMenuClick = () => {
    window.location.href = '#explore-menu';
  };

  return (
    <header className='header'>
      <div className='header-contents'>
        <h2 className='header-contents-heading'>
          Order your favourite food here
        </h2>
        <p className='header-content'>
          Choose from a diverse menu featuring a delectable array of dishes 
          crafted with the finest ingredients and culinary expertise. Our mission 
          is to satisfy your cravings and elevate your dining experience, one 
          delicious meal at a time.
        </p>
        <button 
          className='header-button' 
          onClick={handleViewMenuClick}
        >
          View Menu
        </button>
      </div>
    </header>
  );
};

export default Header;
