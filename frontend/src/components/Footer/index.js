import React from 'react';
import { assets } from '../../assets/assets';
import './index.css';

const Footer = () => {
  return (
    <footer id='footer' className='footer'>
      <div className='footer-content'>
        {/* Left section: Logo, description, and social icons */}
        <div className='footer-content-left'>
          <img 
            src={assets.logo} 
            className='footer-content-logo' 
            alt='Food Munch Logo' 
          />
          <p className='footer-description'>
            Food Munch Restaurant serves delicious food made with fresh ingredients. 
            Our diverse menu has something for everyone. We're passionate about providing 
            a great dining experience. Enjoy tasty meals, good times, and warm hospitality. 
            Come visit us and savor the flavors that make us your favorite restaurant!
          </p>
          <div className='footer-social-icons'>
            <img 
              src={assets.facebook_icon} 
              className='footer-social-icons-image' 
              alt='Facebook' 
            />
            <img 
              src={assets.twitter_icon} 
              className='footer-social-icons-image' 
              alt='Twitter' 
            />
            <img 
              src={assets.linkedin_icon} 
              className='footer-social-icons-image' 
              alt='LinkedIn' 
            />
          </div>
        </div>
        
        {/* Center section: Company links */}
        <div className='footer-content-center'>
          <h2 className='footer-content-title'>COMPANY</h2>
          <ul className='footer-content-list'>
            <li className='footer-content-list-item'>Home</li>
            <li className='footer-content-list-item'>About us</li>
            <li className='footer-content-list-item'>Delivery</li>
            <li className='footer-content-list-item'>Privacy policy</li>
          </ul>
        </div>
        
        {/* Right section: Contact information */}
        <div className='footer-content-right'>
          <h2 className='footer-content-title'>GET IN TOUCH</h2>
          <ul className='footer-content-list'>
            <li className='footer-content-list-item'>+1-987-654-3210</li>
            <li className='footer-content-list-item'>contact@foodmunch.com</li>
          </ul>
        </div>
      </div>
      
      {/* Divider and copyright */}
      <hr className='footer-divider' />
      <p className='footer-copyright'>
        Copyright 2024 © FoodMunch.com - All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
