import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import './index.css';

const FoodItem = (props) => {
    const { id, name, price, description, image } = props;
    const { url, cartItems, addToCart, removeFromCart } = useContext(StoreContext);

    return (
        <div className='food-item'>
            {/* Image container with add/remove functionality */}
            <div className='food-item-image-container'>
                <img
                    src={`${url}/images/${image}`}
                    className='food-item-image'
                    alt={`${name}`}
                />
                {!cartItems[id] ? (
                    <img
                        src={assets.add_icon_white}
                        className='food-item-image-container-add'
                        onClick={() => addToCart(id)}
                        alt='Add to Cart'
                    />
                ) : (
                    <div className='food-item-counter'>
                        <img
                            src={assets.remove_icon_red}
                            className='food-item-counter-image'
                            onClick={() => removeFromCart(id)}
                            alt='Remove from Cart'
                        />
                        <p className='food-item-counter-quantity'>{cartItems[id]}</p>
                        <img
                            src={assets.add_icon_green}
                            className='food-item-counter-image'
                            onClick={() => addToCart(id)}
                            alt='Add more'
                        />
                    </div>
                )}
            </div>
            
            {/* Food item information */}
            <div className='food-item-info'>
                <div className='food-item-name-rating'>
                    <span className='food-item-name'>{name}</span>
                    <img
                        src={assets.rating_starts}
                        className='food-item-rating'
                        alt='Rating'
                    />
                </div>
                <p className='food-item-description'>{description}</p>
                <p className='food-item-price'>₹ {price}</p>
            </div>
        </div>
    );
};

export default FoodItem;
