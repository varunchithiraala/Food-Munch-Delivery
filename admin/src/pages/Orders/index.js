import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';
import './index.css';

const Orders = (props) => {
  const { url } = props;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch all orders from the server
  const fetchAllOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error('Error fetching orders list');
      }
    } catch (error) {
      toast.error('Error fetching orders list');
    } finally {
      setLoading(false);
    }
  }, [url]);

  // Update order status and refresh the orders list
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error('Error updating order status');
      }
    } catch (error) {
      toast.error('Error updating order status');
    }
  };

  // Refresh orders list
  const refreshOrders = async () => {
    setRefreshing(true);
    try {
      await fetchAllOrders();
    } catch (error) {
      toast.error('Error refreshing orders');
    } finally {
      setRefreshing(false);
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  return (
    <div className='orders'>
      {/* Header with refresh button */}
      <div className='orders-header'>
        <h3 className='orders-header-heading'>
          All Users' Orders{' '}
          <span className='orders-count'>({orders.length})</span>
        </h3>
        <button
          onClick={refreshOrders}
          className='refresh-button'
        >
          {refreshing && <div className='spinner refresh-spinner'></div>}
          Refresh
        </button>
      </div>

      {/* Loading spinner while fetching data */}
      {loading ? (
        <div className='spinner-container'>
          <div className='spinner'></div>
        </div>
      ) : (
        <div className='order-list'>
          {/* Render list of orders */}
          {orders.map((order, index) => (
            <div key={index} className='order-item'>
              <img
                src={assets.parcel_icon}
                className='order-item-image'
                alt='Parcel Icon'
              />
              <div>
                <p className='order-item-food'>
                  {order.items.map((item, itemIndex) => {
                    return itemIndex === order.items.length - 1
                      ? `${item.name} x ${item.quantity}`
                      : `${item.name} x ${item.quantity}, `;
                  })}
                </p>
                <p className='order-item-name'>
                  {order.address.firstName} {order.address.lastName}
                </p>
                <div className='order-item-address'>
                  <p>{order.address.street}, </p>
                  <p>
                    {order.address.city}, {order.address.state}, 
                    {order.address.country}, {order.address.zipcode}
                  </p>
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>₹ {order.amount}</p>
              <select
                id={`order-status-${index}`}
                name={`order-status-${index}`}
                value={order.status}
                className='order-item-select'
                onChange={(event) => statusHandler(event, order._id)}
              >
                <option value='Food Processing' className='order-item-select-option'>
                  Food Processing
                </option>
                <option value='Out For Delivery' className='order-item-select-option'>
                  Out For Delivery
                </option>
                <option value='Delivered' className='order-item-select-option'>
                  Delivered
                </option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
