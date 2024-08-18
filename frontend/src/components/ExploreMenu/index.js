import React from 'react';
import { menu_list } from '../../assets/assets';
import './index.css';

const ExploreMenu = (props) => {
  const { category, setCategory } = props;

  return (
    <div className='explore-menu' id='explore-menu'>
      {/* Heading for the menu section */}
      <h1 className='explore-menu-heading'>Explore Our Menu</h1>
      
      {/* Description text for the menu */}
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes. 
        Our mission is to satisfy your cravings and elevate your dining 
        experience, one delicious meal at a time.
      </p>
      
      {/* List of menu items */}
      <div className='explore-menu-list'>
        {menu_list.map((item, index) => (
          <div
            key={index}
            className='explore-menu-list-item'
            onClick={() => setCategory(prevState => (
              prevState === item.menu_name ? 'All' : item.menu_name
            ))}
            aria-label={item.menu_name} // Accessibility label for the item
            role="button" // Role attribute for button-like functionality
          >
            {/* Menu item image */}
            <img
              src={item.menu_image}
              className={category === item.menu_name ? (
                'explore-menu-list-item-image menu-item-active'
              ) : (
                'explore-menu-list-item-image'
              )}
              alt={item.menu_name}
            />
            
            {/* Menu item name */}
            <p className='explore-menu-list-item-name'>{item.menu_name}</p>
          </div>
        ))}
      </div>
      
      {/* Horizontal line separating sections */}
      <hr className='explore-menu-hr' />
    </div>
  );
}

export default ExploreMenu;
