import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import './index.css';

const Cart = (props) => {
  const { setShowLogin } = props;
  const {
    url,
    token,
    cartItems,
    food_list,
    addToCart,
    removeFromCart,
    deleteFromCart,
    getTotalCartAmount,
    loading,
    error,
    fetchFoodList,
    deliveryFee,
    applyPromoCode
  } = useContext(StoreContext);

  const [promoCode, setPromoCode] = useState('');
  const [promoCodeMessage, setPromoCodeMessage] = useState('');
  const [promoCodeError, setPromoCodeError] = useState('');
  const navigate = useNavigate();

  // Check if the cart is empty
  const cartIsEmpty = Object.values(cartItems)
    .filter(quantity => quantity > 0).length === 0;

  // Calculate cart totals
  const subTotal = getTotalCartAmount();
  const adjustedDeliveryFee = subTotal === 0 ? 0 : deliveryFee;
  const totalAmount = subTotal + adjustedDeliveryFee;

  // Handle promo code input change
  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
    setPromoCodeMessage('');
    setPromoCodeError('');
  };

  // Handle promo code submission
  const handlePromoCodeSubmit = async () => {
    if (getTotalCartAmount() === 0) {
      setPromoCodeError(
        'Your cart shouldn\'t be empty to apply a promo code.'
      );
      applyPromoCode('');
    } else if (promoCode === '') {
      setPromoCodeError(
        'Please enter a valid promo code to apply a discount.'
      );
      applyPromoCode('');
    } else if (promoCode === 'Varuncvk' || promoCode === 'FoodMunch') {
      setPromoCodeMessage(
        'Congratulations! Your promo code has been applied successfully.'
      );
      applyPromoCode(promoCode);
    } else {
      setPromoCodeError(
        'Invalid promo code. Please check and try again.'
      );
      applyPromoCode('');
    }
  };

  // Handle proceeding to checkout
  const handleProceedToCheckout = () => {
    if (!token) {
      toast.error('Log in to continue. Add food items to cart before you checkout.');
      navigate('/');
      setShowLogin(true);
    } else if (cartIsEmpty) {
      toast.error('Your cart is empty! Add some food items before you checkout.');
      navigate('/');
      setTimeout(() => {
        window.location.hash = '#explore-menu';
      }, 100);
    } else {
      navigate('/order');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className='spinner-container'>
        <div className='spinner'></div>
        <p className='spinner-text'>Loading your cart...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className='error-container'>
        <h1 className='error-container-heading'>
          Oops! Something went wrong
        </h1>
        <p className='error-container-description'>
          We couldn't load your cart items. Please try again.
        </p>
        <button onClick={fetchFoodList} className='retry-button'>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr className='cart-hr' />
        
        {cartIsEmpty ? (
          <div className='cart-empty-container'>
            <h1 className='cart-empty-heading'>Your cart is empty</h1>
            <p className='cart-empty-description'>
              Looks like you haven't added anything to your cart yet.
            </p>
            <button
              className='explore-button'
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  window.location.hash = '#explore-menu';
                }, 100);
              }}
            >
              Explore Our Menu
            </button>
          </div>
        ) : (
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={index}>
                  <div className='cart-items-title cart-items-item'>
                    <img
                      src={url + '/images/' + item.image}
                      className='cart-items-item-image'
                      alt=''
                    />
                    <p>{item.name}</p>
                    <p>₹ {item.price}</p>
                    <div className='cart-item-counter'>
                      <img
                        src={assets.remove_icon_red}
                        className='cart-item-counter-image'
                        onClick={() => removeFromCart(item._id)}
                        alt='Remove from Cart'
                      />
                      <p>{cartItems[item._id]}</p>
                      <img
                        src={assets.add_icon_green}
                        className='cart-item-counter-image'
                        onClick={() => addToCart(item._id)}
                        alt='Add more'
                      />
                    </div>
                    <p>₹ {item.price * cartItems[item._id]}</p>
                    <p
                      className='cart-items-item-cross'
                      onClick={() => deleteFromCart(item._id)}
                    >
                      X
                    </p>
                  </div>
                  <hr className='cart-hr' />
                </div>
              );
            }
            return null;
          })
        )}
      </div>

      <div className='cart-bottom'>
        <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Sub Total</p>
              <p>₹ {subTotal}</p>
            </div>
            <hr className='cart-total-hr' />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>₹ {adjustedDeliveryFee}</p>
            </div>
            <hr className='cart-total-hr' />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>₹ {totalAmount}</b>
            </div>
          </div>
          <button
            className='cart-total-button'
            onClick={handleProceedToCheckout}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className='cart-promocode'>
          <div>
            <p className='cart-promocode-content'>
              If you have a promo code, Enter it here
            </p>
            <div className='cart-promocode-input-button'>
              <input
                className='cart-promocode-input'
                type='text'
                id='promoCode'
                name='promoCode'
                placeholder='Promo Code'
                value={promoCode}
                onChange={handlePromoCodeChange}
              />
              <button
                className='cart-promocode-button'
                onClick={handlePromoCodeSubmit}
              >
                Submit
              </button>
            </div>
            {promoCodeMessage && (
              <p className='promo-message'>
                {promoCodeMessage}<br />
                Enjoy free delivery on your order.
              </p>
            )}
            {promoCodeError && (
              <p className='promo-error'>{promoCodeError}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
