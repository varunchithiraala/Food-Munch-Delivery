import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem';
import './index.css';

const FoodDisplay = ({ category }) => {
  // Extract values from StoreContext
  const { food_list, loading, error, fetchFoodList } = useContext(StoreContext);

  // Function to render food items based on category
  const renderFoodItems = () => {
    return food_list
      .filter(item => category === "All" || category === item.category)
      .map(item => (
        <FoodItem
          key={item._id}
          id={item._id}
          name={item.name}
          description={item.description}
          price={item.price}
          image={item.image}
        />
      ));
  };

  // Function to render content based on loading and error states
  const renderContent = () => {
    if (loading) {
      return (
        <div className='spinner-container'>
          <div className="spinner"></div>
          <p className='spinner-text'>Loading food items...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-container">
          <h2 className="error-container-heading">Oops! Something went wrong.</h2>
          <p className="error-container-description">
            We couldn’t load the delicious dishes for you. Please try again in a moment.
          </p>
          <button className="retry-button" onClick={fetchFoodList}>Try Again</button>
        </div>
      );
    }

    return (
      <div className="food-display-list">
        {renderFoodItems()} {/* Render the filtered food items */}
      </div>
    );
  };

  return (
    <div className="food-display" id="food-display">
      <h2 className="food-display-heading">Top Dishes Near You</h2>
      {renderContent()} {/* Render the content based on the current state */}
    </div>
  );
};

export default FoodDisplay;
