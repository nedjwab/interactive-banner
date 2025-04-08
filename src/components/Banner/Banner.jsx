import React, { useState, useCallback, useMemo } from 'react';
import { CiText, CiCamera } from "react-icons/ci";
import { LuUpload } from "react-icons/lu";
import { HexColorPicker } from 'react-colorful';
import { IoCloseOutline } from "react-icons/io5";
import coffee from '../../assets/images/coffee.jpg';
import './Banner.css';

const INITIAL_STATE = {
  title: 'Coffee & Pastries: The Perfect Pair!',
  text: 'Start your day with the perfect blend of rich, aromatic coffee and freshly baked pastries. A match made in heaven for every coffee lover!',
  textColor: '#000000',
  bgColor: '#ffffff',
  fontSize: { title: 18, description: 16 },
  fontWeight: { title: 700, description: 400 }
};

const Banner = () => {
  const [banner, setBanner] = useState({
    title: INITIAL_STATE.title,
    text: INITIAL_STATE.text,
    textColor: INITIAL_STATE.textColor,
    bgColor: INITIAL_STATE.bgColor
  });
  
  const [image, setImage] = useState({
    selected: coffee,
    custom: null
  });
  
  const [fontStyles, setFontStyles] = useState({
    size: INITIAL_STATE.fontSize,
    weight: INITIAL_STATE.fontWeight
  });
  
  const [errors, setErrors] = useState({ title: '', text: '' });
  const [isVisible, setIsVisible] = useState(true);

  const handleInputChange = useCallback((field) => (e) => {
    const value = e.target.value.trim();
    setErrors(prev => ({ ...prev, [field]: value ? '' : `${field} should not be empty` }));
    setBanner(prev => ({ ...prev, [field]: e.target.value }));
  }, []);

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(prev => ({ ...prev, custom: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const resetBanner = useCallback(() => {
    setBanner({
      title: INITIAL_STATE.title,
      text: INITIAL_STATE.text,
      textColor: INITIAL_STATE.textColor,
      bgColor: INITIAL_STATE.bgColor
    });
    setImage({ selected: coffee, custom: null });
    setFontStyles({
      size: INITIAL_STATE.fontSize,
      weight: INITIAL_STATE.fontWeight
    });
    setErrors({ title: '', text: '' });
  }, []);

  const bannerContent = useMemo(() => (
    <div className="banner" style={{ backgroundColor: banner.bgColor }}>
      <div className="banner-elements">
        <img 
          src={image.custom || image.selected} 
          alt="Banner" 
          className="banner-image"
        />
        <div className="banner-content" data-aos="fade-up-right">
          <div className="banner-text">
            <h1 className="banner-title animate__animated animate__bounceInLeft"
              style={{ 
                color: banner.textColor,
                fontSize: `${fontStyles.size.title}px`,
                fontWeight: fontStyles.weight.title
              }}>
              {banner.title}
            </h1>
            <p className="banner-description animate__animated animate__bounceInRight"
              style={{ 
                color: banner.textColor,
                fontSize: `${fontStyles.size.description}px`,
                fontWeight: fontStyles.weight.description
              }}>
              {banner.text}
            </p>
            <button className="buttons donate-button">Donate now</button>
            <button className="buttons more-bitton">Learn More</button>
          </div>
        </div>
        <IoCloseOutline 
          className="close-icon" 
          fontSize="25px" 
          onClick={() => setIsVisible(false)} 
        />
      </div>
    </div>
  ), [banner, image, fontStyles]);

  return (
    <div>
      {isVisible && bannerContent}
      
      <div className="controls">
        <div className="controls-panel">
          <div className="controls-header">
            <h2 className="controls-title">Customize Your Experience</h2>
            <button className="reset-button" onClick={resetBanner}>
              Reset
            </button>
          </div>

          <TextControls
            banner={banner}
            fontStyles={fontStyles}
            errors={errors}
            setBanner={setBanner}
            setFontStyles={setFontStyles}
            handleInputChange={handleInputChange}
          />

          <ImageControls
            bgColor={banner.bgColor}
            handleImageUpload={handleImageUpload}
            setBanner={setBanner}
          />
        </div>
      </div>
    </div>
  );
};

const TextControls = React.memo(({
  banner,
  fontStyles,
  errors,
  setBanner,
  setFontStyles,
  handleInputChange
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <>
      <div className="control-section">
        <h3 className="control-heading">
          <CiText className="icon" /> Text Styling
        </h3>
        <div className="text-controls">
          <div className="color-picker-container" style={{ position: "relative" }}>
            <div 
              className="color-picker-square"
              style={{ 
                backgroundColor: banner.textColor,
                width: "30px",
                height: "30px",
                borderRadius: "4px",
                cursor: "pointer",
                border: "1px solid var(--color-gray-medium)"
              }}
              onClick={() => setShowColorPicker(!showColorPicker)}
            />
            {showColorPicker && (
              <div className="color-picker-popup">
                <HexColorPicker 
                  color={banner.textColor} 
                  onChange={(color) => setBanner(prev => ({ ...prev, textColor: color }))}
                  onMouseLeave={() => setShowColorPicker(false)}
                />
              </div>
            )}
          </div>
          
          <div className="font-controls">
            {['title', 'description'].map((type) => (
              <React.Fragment key={type}>
                <div className="font-control-group">
                  <label>{`${type.charAt(0).toUpperCase() + type.slice(1)} Size:`}</label>
                  <input
                    type="range"
                    min={type === 'title' ? 24 : 14}
                    max={type === 'title' ? 72 : 24}
                    value={fontStyles.size[type]}
                    onChange={(e) => setFontStyles(prev => ({
                      ...prev,
                      size: { ...prev.size, [type]: Number(e.target.value) }
                    }))}
                  />
                  <span>{fontStyles.size[type]}px</span>
                </div>
                <div className="font-control-group">
                  <label>{`${type.charAt(0).toUpperCase() + type.slice(1)} Weight:`}</label>
                  <select
                    value={fontStyles.weight[type]}
                    onChange={(e) => setFontStyles(prev => ({
                      ...prev,
                      weight: { ...prev.weight, [type]: Number(e.target.value) }
                    }))}
                  >
                    {type === 'title' ? (
                      [400, 500, 600, 700, 800].map((weight) => (
                        <option key={weight} value={weight}>
                          {['Regular', 'Medium', 'Semi Bold', 'Bold', 'Extra Bold'][weight/100 - 4]}
                        </option>
                      ))
                    ) : (
                      [300, 400, 500, 600].map((weight) => (
                        <option key={weight} value={weight}>
                          {['Light', 'Regular', 'Medium', 'Semi Bold'][weight/100 - 3]}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="control-section">
        <h3 className="control-heading">
          <CiText className="icon" /> Banner Text
        </h3>
        <TextInput
          label="Banner Title"
          id="banner-title"
          value={banner.title}
          onChange={handleInputChange('title')}
          error={errors.title}
        />
        <TextInput
          label="Banner Description"
          id="banner-description"
          value={banner.text}
          onChange={handleInputChange('text')}
          error={errors.text}
          isTextArea
        />
      </div>
    </>
  );
});

const ImageControls = React.memo(({ bgColor, handleImageUpload, setBanner }) => (
  <div className="control-section">
    <h3 className="control-heading">
      <CiCamera className="icon" /> Background
    </h3>
    <div className="image-upload">
      <label className="upload-button">
        <LuUpload className="icon" />
        Upload Custom Image
        <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
      </label>
    </div>
    <div className="bg-color-controls">
      <label>Background Color:</label>
      <input 
        type="color" 
        value={bgColor}
        onChange={(e) => setBanner(prev => ({ ...prev, bgColor: e.target.value }))}
        className="color-input"
      />
    </div>
  </div>
));

const TextInput = React.memo(({ label, id, value, onChange, error, isTextArea }) => (
  <div className="input-group">
    <label htmlFor={id}>{label}</label>
    {isTextArea ? (
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label.toLowerCase()}`}
        rows={3}
        className="text-input"
      />
    ) : (
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="text-input"
      />
    )}
    {error && <p className="error">{error}</p>}
  </div>
));

export default React.memo(Banner);