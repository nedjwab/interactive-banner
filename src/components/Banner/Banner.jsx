import React, { useState } from 'react';
import { LuCroissant } from "react-icons/lu";
import { CiText,CiCamera } from "react-icons/ci";
import { TbCookie } from "react-icons/tb";
import { GiPieSlice } from "react-icons/gi";
import { BsCake2 } from "react-icons/bs";
import coffee from '../../assets/images/coffee.jpg';
import cup from '../../assets/images/cup.jpg';
import gateaux from '../../assets/images/gateaux.jpg';
import sweet from '../../assets/images/sweet.jpg';
import './Banner.css';

function App() {
  const [timeOfDay, setTimeOfDay] = useState('croissanthours');
  const [bannerTitle, setBannerTitle] = useState('Coffee & Pastries: The Perfect Pair!');
  const [bannerText, setBannerText] = useState(
    'Start your day with the perfect blend of rich, aromatic coffee and freshly baked pastries. A match made in heaven for every coffee lover!.'
  );
  const [selectedImage, setSelectedImage] = useState(0);
  
  const images = [
    coffee,
    cup,
    gateaux,
    sweet
  ];

  const CakeIcon = {
    croissanthours:  LuCroissant,
    macarontime: TbCookie,
    pieoclock:GiPieSlice,
    mooncakemode:BsCake2
  }[timeOfDay];

  return (
    <div>
      <div className="banner">
        <img 
          src={images[selectedImage]} 
          alt="Travel destination" 
          className="banner-image"
        />
        <div className={`banner-overlay ${timeOfDay}`} />
        <div className="banner-content">
          <div className="banner-text">
            <div className="banner-icons">
              <GiPieSlice className="icon large" />
              <CakeIcon className="icon large" />
            </div>
            <h1 className="banner-title">
              {bannerTitle}
            </h1>
            <p className="banner-description">
              {bannerText}
            </p>
          </div>
        </div>
      </div>

      <div className="controls">
        <div className="controls-panel">
          <h2 className="controls-title">Customize Your Experience</h2>
          <div className="control-section">
            <h3 className="control-heading">
              <TbCookie className="icon" /> Cake Time
            </h3>
            <div className="time-buttons">
              {['croissanthours', 'macarontime', 'pieoclock', 'mooncakemode'].map((time) => (
                <button
                  key={time}
                  onClick={() => setTimeOfDay(time)}
                  className={`time-button ${timeOfDay === time ? 'active' : ''}`}
                >
                  {time.charAt(0).toUpperCase() + time.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="control-section">
            <h3 className="control-heading">
              <CiText className="icon" /> Banner Text
            </h3>
            <input
              type="text"
              value={bannerTitle}
              onChange={(e) => setBannerTitle(e.target.value)}
              placeholder="Enter banner title"
              className="text-input"
            />
            <textarea
              value={bannerText}
              onChange={(e) => setBannerText(e.target.value)}
              placeholder="Enter banner description"
              rows={3}
              className="text-input"
            />
          </div>

          <div className="control-section">
            <h3 className="control-heading">
              <CiCamera className="icon" /> Background Image
            </h3>
            <div className="image-grid">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`image-button ${selectedImage === index ? 'selected' : ''}`}
                >
                  <img
                    src={image}
                    alt={`Travel scene ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;