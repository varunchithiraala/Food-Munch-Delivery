import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

// Displays the main welcome message and navigation options
const Home = () => {
  return (
    <div className='home'>
      {/* Main heading for the home page */}
      <h1 className='home-heading'>
        Welcome to the Admin Portal
      </h1>
      
      {/* Description text for navigation */}
      <p className='home-description'>
        Use the sidebar to navigate through different sections:
      </p>
      
      {/* List of navigation options */}
      <ul className='home-lists'>
        <li className='home-list'>
          <Link to='/add'>Add Items</Link>: 
          Add new food items to the list.
        </li>
        <li className='home-list'>
          <Link to='/list'>List Items</Link>: 
          View and manage the list of food items.
        </li>
        <li className='home-list'>
          <Link to='/orders'>Orders</Link>: 
          View and manage customer orders.
        </li>
      </ul>
    </div>
  );
};

export default Home;
