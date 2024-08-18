import React, { useState } from 'react';
import './index.css';
import Header from '../../components/Header';
import ExploreMenu from '../../components/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay';
import AppDownload from '../../components/AppDownload';

const Home = () => {
  // State to manage the selected category
  const [category, setCategory] = useState('All');

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;
