import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider from './context/StoreContext';
import App from './App';
import './index.css';

// Create a root element for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  <BrowserRouter>
    {/* Provide store context to the entire app */}
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>
);
