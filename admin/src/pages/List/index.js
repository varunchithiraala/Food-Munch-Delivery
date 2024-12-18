import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './index.css';

const List = (props) => {
  const { url } = props;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch the list of food items
  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data); // Set the fetched food items to the list
      } else {
        toast.error('Failed to fetch the list of foods.');
      }
    } catch (error) {
      toast.error('Error fetching list of foods');
    } finally {
      setLoading(false);
    }
  }, [url]);

  // Function to remove a food item
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // Refresh the list after removing an item
      } else {
        toast.error('Failed to remove food item.');
      }
    } catch (error) {
      toast.error('Error removing food item');
    }
  };

  // Fetch the list when the component mounts or fetchList changes
  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <div className='flex-col list'>
      <h3>
        All Foods List{' '}
        <span className='list-count'>({list.length})</span>
      </h3>
      {loading ? (
        <div className='spinner-container'>
          <div className='spinner'></div> {/* Show loading spinner while data is being fetched */}
        </div>
      ) : (
        <div>
          <div className='list-table-format title'>
            <b>Image</b>
            <b>Name</b>
            <b>Price</b>
            <b>Category</b>
            <b>Action</b>
          </div>
          {list.map((item, index) => (
            <div key={index} className='list-table-format'>
              <img
                src={`${url}/images/` + item.image}
                className='list-table-format-image'
                alt=''
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹ {item.price}</p>
              <p
                className='cursor remove remove-button'
                onClick={() => removeFood(item._id)} // Handle food item removal
              >
                X
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
