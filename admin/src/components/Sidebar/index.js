import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './index.css';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-options'>
        {/* Link to add items */}
        <NavLink to='/add' className='sidebar-option'>
          <img
            src={assets.add_icon}
            className='sidebar-option-image'
            alt='Add Items'
          />
          <p className='sidebar-option-text'>Add Items</p>
        </NavLink>
        
        {/* Link to list items */}
        <NavLink to='/list' className='sidebar-option'>
          <img
            src={assets.order_icon}
            className='sidebar-option-image'
            alt='List Items'
          />
          <p className='sidebar-option-text'>List Items</p>
        </NavLink>
        
        {/* Link to view orders */}
        <NavLink to='/orders' className='sidebar-option'>
          <img
            src={assets.order_icon}
            className='sidebar-option-image'
            alt='Order'
          />
          <p className='sidebar-option-text'>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
