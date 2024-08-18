import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './index.css';

const Navbar = (props) => {
  const { setShowLogin } = props;
  const [menu, setMenu] = useState('home');
  const [username, setUsername] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, setToken, getCartItemsCount } = useContext(StoreContext);
  const navigate = useNavigate();

  // Handle logout functionality
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken('');
    navigate('/');
  };

  // Navigate to orders page
  const orders = () => {
    navigate('/myorders');
  };

  // Get the first word from the username
  const getFirstWord = (str) => {
    return str.split(' ')[0];
  };

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Set username from localStorage when token changes
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
  }, [token]);

  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <img
          src={assets.navbar_icon}
          className='navbar-icon'
          alt='Navbar Icon'
          onClick={toggleMenu}
        />
        <Link to='/'>
          <img
            src={assets.logo}
            className='logo'
            alt='FoodMunch Logo'
          />
        </Link>
        </div>
          <ul className='navbar-menu'>
            <Link
              to='/'
              className={menu === "home" ? "menu-active" : ""}
              onClick={() => setMenu("home")}
            >
              Home
            </Link>
            <a
              href='#explore-menu'
              className={menu === "menu" ? "menu-active" : ""}
              onClick={() => setMenu("menu")}
            >
              Menu
            </a>
            <a
              href='#app-download'
              className={menu === "mobile-app" ? "menu-active" : ""}
              onClick={() => setMenu("mobile-app")}
            >
              Mobile App
            </a>
            <a
              href='#footer'
              className={menu === "contact-us" ? "menu-active" : ""}
              onClick={() => setMenu("contact-us")}
            >
              Contact Us
            </a>
          </ul>
          <div className='navbar-right'>
            <img
              className='navbar-search-icon navbar-search'
              src={assets.search_icon}
              alt='Search Icon'
            />
            <div className='navbar-right-image'>
              <Link to='/cart'>
                <img
                  src={assets.basket_icon}
                  className='navbar-cart-icon'
                  alt='Cart Icon'
                />
              </Link>
              {getCartItemsCount() > 0 && (
                <div className='dot'>{getCartItemsCount()}</div>
              )}
            </div>
            {!token ? (
              <button
                className='navbar-button'
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
              ) : (
                <div className='navbar-profile'>
                  <div className='navbar-profile-container'>
                    <img
                      src={assets.profile_icon}
                      className='navbar-profile-icon'
                      alt='Profile Icon'
                    />
                    <p className='navbar-username'>{getFirstWord(username)}</p>
                  </div>
                  <ul className="nav-profile-dropdown">
                    <li
                      className='nav-profile-dropdown-list'
                      onClick={orders}
                    >
                      <img
                        src={assets.bag_icon}
                        className='nav-profile-dropdown-image'
                        alt='Orders Icon'
                      />
                      <p className='nav-profile-dropdown-text'>Orders</p>
                    </li>
                    <hr />
                    <li
                      className='nav-profile-dropdown-list'
                      onClick={logout}
                    >
                      <img
                        src={assets.logout_icon}
                        className='nav-profile-dropdown-image'
                        alt='Logout Icon'
                      />
                      <p
                        className='nav-profile-dropdown-text'
                        onClick={() => window.location.reload()}
                      >
                        Logout
                      </p>
                    </li>
                  </ul>
                </div>
              )
            }
          </div>

          {/* Side Navbar for Mobile Devices */}
          <div className={`side-navbar ${isMenuOpen ? 'open' : ''}`}>
            <div className='side-navbar-header'>
              <img
                src={assets.cross_icon}
                className='cross-icon'
                alt='Close Icon'
                onClick={toggleMenu}
              />
            </div>
            <ul className='side-navbar-menu'>
              <Link
                to='/'
                className={menu === "home" ? "mobile-menu-active" : ""}
                onClick={() => { setMenu("home"); toggleMenu(); }}
              >
                Home
              </Link>
              <a
                href='#explore-menu'
                className={menu === "menu" ? "mobile-menu-active" : ""}
                onClick={() => { setMenu("menu"); toggleMenu(); }}
              >
                Menu
              </a>
              <a
                href='#app-download'
                className={menu === "mobile-app" ? "mobile-menu-active" : ""}
                onClick={() => { setMenu("mobile-app"); toggleMenu(); }}
              >
                Mobile App
              </a>
              <a
                href='#footer'
                className={menu === "contact-us" ? "mobile-menu-active" : ""}
                onClick={() => { setMenu("contact-us"); toggleMenu(); }}
              >
                Contact Us
              </a>
            </ul>
      </div>
    </div>
  );
};

export default Navbar;
