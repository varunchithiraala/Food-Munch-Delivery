import React from 'react';
import './index.css';
import { assets } from '../../assets/assets';

const AppDownload = () => {
  return (
    <div id='app-download' className='app-download'>
      {/* Section heading text */}
      <p className='app-download-text'>
        For a Better Experience, Download
        <br /> the Food Munch App
      </p>
      
      {/* Platform download links */}
      <div className='app-download-platforms'>
        <img
          src={assets.play_store} // Image for Google Play
          className='app-download-platforms-image'
          alt='Download on Google Play'
        />
        <img
          src={assets.app_store} // Image for the App Store
          className='app-download-platforms-image'
          alt='Download on the App Store'
        />
      </div>
    </div>
  );
}

export default AppDownload;
