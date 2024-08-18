import React, { useState } from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import './index.css';

const Add = (props) => {
  const { url } = props;

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    category: 'Salad',
    price: ''
  });

  // Handler for form field changes
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  // Handler for form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);

    try {
      const response = 
        await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        // Reset form data on success
        setData({
          name: '',
          description: '',
          category: 'Salad',
          price: ''
        });
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error adding food item');
    }
  };

  return (
    <div className='add'>
      <form
        className='flex-col add-form'
        onSubmit={onSubmitHandler}
      >
        <div className='flex-col'>
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img
              src={image ? 
                URL.createObjectURL(image) : assets.upload_area}
              className='add-image'
              alt='Upload Area'
            />
          </label>
          <input
            type='file'
            id='image'
            onChange={(event) => 
              setImage(event.target.files[0])
            }
            hidden
            required
          />
        </div>
        <div className='flex-col add-product-name'>
          <p>Product Name</p>
          <input
            type='text'
            className='add-product-input'
            name='name'
            value={data.name}
            onChange={onChangeHandler}
            placeholder='Type here'
            autoComplete='off'
            required
          />
        </div>
        <div className='flex-col add-product-description'>
          <p>Product Description</p>
          <textarea
            className='add-product-textarea'
            name='description'
            value={data.description}
            rows='6'
            onChange={onChangeHandler}
            placeholder='Write content here'
            required
            autoComplete='off'
          ></textarea>
        </div>
        <div className='add-category-price'>
          <div className='flex-col'>
            <p>Product Category</p>
            <select
              className='add-category-select'
              name='category'
              value={data.category}
              onChange={onChangeHandler}
              autoComplete='off'
              required
            >
              <option value='Salad'>Salad</option>
              <option value='Rolls'>Rolls</option>
              <option value='Deserts'>Deserts</option>
              <option value='Sandwich'>Sandwich</option>
              <option value='Cake'>Cake</option>
              <option value='Pure Veg'>Pure Veg</option>
              <option value='Pasta'>Pasta</option>
              <option value='Noodles'>Noodles</option>
            </select>
          </div>
          <div className='flex-col'>
            <p>Product Price</p>
            <input
              type='number'
              className='add-price-input'
              name='price'
              value={data.price}
              onChange={onChangeHandler}
              placeholder='₹ 109'
              autoComplete='off'
              required
            />
          </div>
        </div>
        <button
          type='submit'
          className='add-button'
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
