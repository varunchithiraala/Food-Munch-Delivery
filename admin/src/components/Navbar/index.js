import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './index.css';

const Navbar = () => {
  const navigate = useNavigate();

  // Function to handle logo click
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className='navbar'>
      {/* Logo image with click handler */}
      <img
        src={assets.logo}
        className='navbar-logo'
        alt='Logo'
        onClick={handleLogoClick}
      />
      
      {/* Admin portal text */}
      <p className='admin-portal-text'>Admin Portal</p>
      
      {/* Profile image */}
      <img
        src={assets.profile_image}
        className='navbar-profile'
        alt='Profile'
      />
    </div>
  );
};

export default Navbar;
