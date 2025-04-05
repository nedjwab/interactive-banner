import React, { useState, useCallback } from 'react';
import { CiText,CiCamera } from "react-icons/ci";
import { LuUpload } from "react-icons/lu";
import { HexColorPicker } from 'react-colorful';
import { IoCloseOutline } from "react-icons/io5";
import coffee from '../../assets/images/coffee.jpg';
import './Banner.css';

const Banner = () => {

  const [bannerTitle, setBannerTitle] = useState('Coffee & Pastries: The Perfect Pair!');
  const [bannerText, setBannerText] = useState(
    'Start your day with the perfect blend of rich, aromatic coffee and freshly baked pastries. A match made in heaven for every coffee lover!'
  );
  const [selectedImage, setSelectedImage] = useState(coffee);
  const [errors, setErrors] = useState({ title: '', text: '' });
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState({ title: 17.6, description: 15 });
  const [fontWeight, setFontWeight] = useState({ title: 700, description: 400 });
  const [customImage, setCustomImage] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
 
  

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const changeTitle = (e) => {
    const title = e.target.value;
    if (!title.trim()) {
      setErrors((prev) => ({ ...prev, title: 'Title should be more than 0 characters' }));
      return;
    }
    setBannerTitle(title);
    setErrors((prev) => ({ ...prev, title: '' }));
  };

  const changeText = (e) => {
    const text = e.target.value;
    if (!text.trim()) {
      setErrors((prev) => ({ ...prev, text: 'Text should be more than 0 characters' }));
      return;
    }
    setBannerText(text);
    setErrors((prev) => ({ ...prev, text: '' }));
  };

  const handleCloseBanner = () => {
    setIsVisible(!isVisible); 
  }

  const resetBanner = () => {
    setBannerTitle('Coffee & Pastries: The Perfect Pair!');
    setBannerText('Start your day with the perfect blend of rich, aromatic coffee and freshly baked pastries. A match made in heaven for every coffee lover!');
    setSelectedImage(coffee);
    setCustomImage(null);
    setErrors({ title: '', text: '' });
    setTextColor('#000000');
    setFontSize({ title: 18, description: 16 });
    setFontWeight({ title: 700, description: 400 });
    setShowColorPicker(false);
    setBgColor('#ffffff');
  };

  return (
    <>
    
    <div>
    {isVisible && (
      <div className="banner" style={{ backgroundColor: bgColor }}>
        <div className='banner-elements' >
        <img 
          src={customImage || selectedImage} 
          alt="Coffee image" 
          className="banner-image"
        />
        <div className="banner-content" data-aos="fade-up-right">
          <div className="banner-text"> 
            <h1 
              className="banner-title animate__animated animate__bounceInLeft"
              style={{ 
                color: textColor,
                fontSize: `${fontSize.title}px`,
                fontWeight: fontWeight.title
              }}
            >
              {bannerTitle}
            </h1>
            <p 
              className="banner-description animate__animated animate__bounceInRight"
              style={{ 
                color: textColor,
                fontSize: `${fontSize.description}px`,
                fontWeight: fontWeight.description
              }}
            >
              {bannerText}
            </p>
            <button className='buttons donate-button'>Donate now</button>
            <button className='buttons more-bitton'>Learn More</button>
          </div>
        
        </div>
        <IoCloseOutline className='close-icon ' fontSize={"25px"} onClick={handleCloseBanner}/>
        </div>
      </div>
       )}
      <div className="controls">
        <div className="controls-panel">
          <div className='controls-header'>
          <h2 className="controls-title">Customize Your Experience</h2>
          <button className="reset-button" onClick={resetBanner}>
            Reset
          </button>
          </div>
      
          <div className="control-section">
            <h3 className="control-heading">
              <CiText className="icon" /> Text Styling
            </h3>
            <div className="text-controls">
              <div className="color-picker-container" style={{ position: "relative" }}>
              <div 
                className="color-picker-square" 
                style={{ backgroundColor: textColor, width: "30px", height: "30px", borderRadius: "4px", cursor: "pointer", border: "1px solid #ccc" }}
                onClick={() => {
                  setShowColorPicker(!showColorPicker);
                  setShowBgColorPicker(false);
                }}
              ></div>
                {showColorPicker && (
                  <div className="color-picker-popup">
                    <HexColorPicker color={textColor} onChange={setTextColor} onMouseUp={() => setShowColorPicker(false)} />
                  </div>
                )}
              </div>
              
              <div className="font-controls">
                <div className="font-control-group">
                  <label>Title Size : </label>
                  <input
                    type="range"
                    min="24"
                    max="72"
                    value={fontSize.title}
                    onChange={(e) => setFontSize(prev => ({ ...prev, title: Number(e.target.value) }))}
                  />
                  <span>{fontSize.title}px</span>
                </div>
                
                <div className="font-control-group">
                  <label>Title Weight : </label>
                  <select
                    value={fontWeight.title}
                    onChange={(e) => setFontWeight(prev => ({ ...prev, title: Number(e.target.value) }))}
                  >
                    <option value="400">Regular</option>
                    <option value="500">Medium</option>
                    <option value="600">Semi Bold</option>
                    <option value="700">Bold</option>
                    <option value="800">Extra Bold</option>
                  </select>
                </div>

                <div className="font-control-group">
                  <label>Description Size : </label>
                  <input
                    type="range"
                    min="14"
                    max="24"
                    value={fontSize.description}
                    onChange={(e) => setFontSize(prev => ({ ...prev, description: Number(e.target.value) }))}
                  />
                  <span>{fontSize.description}px</span>
                </div>

                <div className="font-control-group">
                  <label>Description Weight : </label>
                  <select
                    value={fontWeight.description}
                    onChange={(e) => setFontWeight(prev => ({ ...prev, description: Number(e.target.value) }))}
                  >
                    <option value="300">Light</option>
                    <option value="400">Regular</option>
                    <option value="500">Medium</option>
                    <option value="600">Semi Bold</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="control-section">
            <h3 className="control-heading">
              <CiText className="icon" /> Banner Text
            </h3>
            <div className="input-group">
              <label htmlFor="banner-title" >
                Banner Title
              </label>
              <input
                id="banner-title"
                type="text"
                value={bannerTitle}
                onChange={changeTitle}
                placeholder="Enter banner title"
                className="text-input"
              />
              {errors.title && <p className="error">{errors.title}</p>}
            </div>
            <div className="input-group">
              <label htmlFor="banner-description" >
                Banner Description
              </label>
              <textarea
                id="banner-description"
                value={bannerText}
                onChange={changeText}
                placeholder="Enter banner description"
                rows={3}
                className="text-input"
              />
              {errors.text && <p className="error">{errors.text}</p>}
            </div>
          </div>

          <div className="control-section">
            <h3 className="control-heading">
              <CiCamera className="icon" /> Background Image
            </h3>
            <div className="image-upload">
              <label className="upload-button">
                <LuUpload className="icon" />
                Upload Custom Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div className="bg-color-controls" style={{ position: "relative" }}>
              <p>Baground Color :</p>
              <input  style={{ width: "30px", height: "30px", borderRadius: "4px", cursor: "pointer", border: "none" }} type='color' value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </div>
 
   </>
  );
}

export default Banner;