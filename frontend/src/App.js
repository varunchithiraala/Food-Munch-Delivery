import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Footer from './components/Footer';
import LoginPopUp from './components/LoginPopup';
import Verify from './pages/Verify';
import MyOrders from './pages/MyOrders';
import NotFound from './pages/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  // State to control login popup visibility
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Toast notifications container */}
      <ToastContainer />
      
      {/* Conditional rendering of login popup */}
      {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}
            
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />     
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart setShowLogin={setShowLogin} />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>      
      <Footer />
    </>
  );
}

export default App;
