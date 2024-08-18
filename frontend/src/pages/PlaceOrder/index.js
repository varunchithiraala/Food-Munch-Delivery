import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import './index.css';

const PlaceOrder = () => {
  // Destructure context values
  const {
    url,
    token,
    food_list,
    cartItems,
    setCartItems,
    promoCode,
    applyPromoCode,
    getTotalCartAmount,
    deliveryFee
  } = useContext(StoreContext);
  const navigate = useNavigate();

  // State for order data
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  // State for payment method
  const [paymentMethod, setPaymentMethod] = useState('COD');

  // Handle input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Place the order
  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    // Prepare order items
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    // Create order data
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + deliveryFee,
      promoCode: promoCode,
    };

    if (paymentMethod === 'COD') {
      // COD logic: Place order and navigate to the orders page
      try {
        let response = await axios.post(`${url}/api/order/place`, orderData, {
          headers: { token },
        });
        if (response.data.success) {
          toast.success('Order placed Successfully.');
          navigate('/myorders');
          setCartItems({});
          applyPromoCode(0);
        } else {
          toast.error('Order failed. Please try again.');
        }
      } catch (error) {
        toast.error('Order failed. Please try again.');
        console.error('Error placing order:', error);
      }
    } else if (paymentMethod === 'Stripe') {
      // Stripe payment logic: Redirect to Stripe session URL
      try {
        let response = await axios.post(`${url}/api/order/place`, orderData, {
          headers: { token },
        });
        if (response.data.success) {
          const { session_url } = response.data;
          window.location.replace(session_url);
        } else {
          toast.error('Order failed. Please try again.');
        }
      } catch (error) {
        toast.error('Order failed. Please try again.');
        console.error('Error placing order:', error);
      }
    }
  };

  // Redirect if not authenticated or cart is empty
  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="place-order-title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            name="firstName"
            value={data.firstName}
            className="place-order-left-input"
            onChange={onChangeHandler}
            placeholder="First Name"
            autoComplete="given-name"
            required
          />
          <input
            type="text"
            name="lastName"
            value={data.lastName}
            className="place-order-left-input"
            onChange={onChangeHandler}
            placeholder="Last Name"
            autoComplete="family-name"
            required
          />
        </div>
        <input
          type="text"
          name="email"
          value={data.email}
          className="place-order-left-input"
          onChange={onChangeHandler}
          placeholder="Email Address"
          autoComplete="email"
          required
        />
        <input
          type="text"
          name="street"
          value={data.street}
          className="place-order-left-input"
          onChange={onChangeHandler}
          placeholder="Street"
          autoComplete="street-address"
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            name="city"
            value={data.city}
            className="place-order-left-input"
            onChange={onChangeHandler}
            placeholder="City"
            autoComplete="address-level1"
            required
          />
          <input
            type="text"
            name="state"
            value={data.state}
            className="place-order-left-input"
            onChange={onChangeHandler}
            placeholder="State"
            autoComplete="address-level2"
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            name="zipcode"
            value={data.zipcode}
            className="place-order-left-input"
            onChange={onChangeHandler}
            placeholder="Zip Code"
            autoComplete="postal-code"
            required
          />
          <input
            type="text"
            name="country"
            value={data.country}
            className="place-order-left-input"
            onChange={onChangeHandler}
            placeholder="Country"
            autoComplete="country-name"
            required
          />
        </div>
        <input
          type="text"
          name="phone"
          value={data.phone}
          className="place-order-left-input"
          onChange={onChangeHandler}
          placeholder="Phone"
          autoComplete="tel"
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>₹ {getTotalCartAmount()}</p>
            </div>
            <hr className="cart-total-hr" />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹ {deliveryFee}</p>
            </div>
            <hr className="cart-total-hr" />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹ {getTotalCartAmount() + deliveryFee}</b>
            </div>
          </div>

          <h2 className="payment-method-heading">Payment Method</h2>
          <div className="payment-method-options">
            <div
              className={`payment-method-option ${
                paymentMethod === 'COD' ? 'selected' : ''
              }`}
              onClick={() => setPaymentMethod('COD')}
            >
              <img
                src={paymentMethod === 'COD' ?
                  assets.selector_icon : assets.select_icon}
                className="selector-icon"
                alt="Selector Icon"
              />
              <span className='payment-type'>COD (Cash on Delivery)</span>
            </div>
            <div
              className={`payment-method-option ${
                paymentMethod === 'Stripe' ? 'selected' : ''
              }`}
              onClick={() => setPaymentMethod('Stripe')}
            >
              <img
                src={paymentMethod === 'COD' ?
                  assets.select_icon : assets.selector_icon}
                className="selector-icon"
                alt="Selector Icon"
              />
              <span className='payment-type'>Stripe (Credit/Debit)</span>
            </div>
          </div>
          <button type="submit" className="place-order-cart-total-button">
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
