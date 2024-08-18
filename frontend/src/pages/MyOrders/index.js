import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import './index.css';

const MyOrders = () => {
  // Context values and state declarations
  const {
    url,
    token,
    loading: globalLoading,
    error: globalError,
    setLoading,
    setError
  } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loadingOrderIndex, setLoadingOrderIndex] = useState(null);
  const navigate = useNavigate();

  // Fetch orders data
  const fetchOrdersData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (err) {
      setError('Failed to fetch orders. Please try again later.');
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  }, [url, token, setLoading, setError]);

  // Track individual order
  const trackOrder = async (index) => {
    setLoadingOrderIndex(index);
    setError(null);
    try {
      const response = await axios.post(`${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (err) {
      setError('Failed to track order. Please try again later.');
      console.error('Failed to track order:', err);
    } finally {
      setLoadingOrderIndex(null);
    }
  };

  // Check authentication and fetch orders on mount
  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      fetchOrdersData();
    }
  }, [token, fetchOrdersData, navigate]);

  // Loading state
  if (globalLoading) {
    return (
      <div className='spinner-container'>
        <div className='spinner'></div>
        <p className='spinner-text'>Loading your orders...</p>
      </div>
    );
  }

  // Error state
  if (globalError) {
    return (
      <div className='error-container'>
        <h1 className='error-container-heading'>
          Oops! Something went wrong
        </h1>
        <p className='error-container-description'>
          {globalError}
        </p>
        <button
          onClick={fetchOrdersData}
          className='retry-button'
        >
          Retry
        </button>
      </div>
    );
  }

  // No orders state
  if (data.length === 0) {
    return (
      <div className='empty-orders-container'>
        <h1 className='empty-orders-heading'>No Orders Found</h1>
        <p className='empty-orders-description'>
          It seems like you're new to Food Munch.
          <br />Start exploring our menu items to place your first order!
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
    );
  }

  // Orders display
  return (
    <div className='my-orders'>
      <h2>My Orders{' '}
        <span className='orders-count'>({data.length})</span>
      </h2>
      <div className='my-orders-container'>
        {data.map((order, index) => (
          <div key={index} className='my-orders-order'>
            <img
              src={assets.parcel_icon}
              className='my-orders-order-image'
              alt='Order'
            />
            <p>
              {order.items && order.items.map((item, itemIndex) => (
                itemIndex === order.items.length - 1 
                  ? `${item.name} x ${item.quantity}` 
                  : `${item.name} x ${item.quantity}, `
              ))}
            </p>
            <p>₹ {order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span className='my-orders-order-dot'>&#x25cf; </span>
              <b className='my-orders-order-status'>{order.status}</b>
            </p>
            <button 
              className='my-orders-order-button' 
              onClick={() => trackOrder(index)}
              disabled={loadingOrderIndex === index}
            >
              {loadingOrderIndex === index ? 'Loading...' : 'Track Order'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
