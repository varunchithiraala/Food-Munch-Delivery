import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import NotFound from './pages/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  // Base URL for API requests
  const url = 'https://food-munch-delivery-backend.onrender.com';
  
  return (
    <div>
      {/* Toast notifications container */}
      <ToastContainer />
      
      {/* Navigation bar */}
      <Navbar />
      <hr />

      <div className='app-content'>
        {/* Sidebar navigation */}
        <Sidebar />
        
        {/* Routing for different pages */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} />} />
          <Route path='/orders' element={<Orders url={url} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
