import React, { useState } from 'react';
import { BsAirplane } from "react-icons/bs";
import { IoSunnyOutline } from "react-icons/io5";
import travelImage  from '../../assets/images/travel.jpg';
import plane from '../../assets/images/plane.jpg';
import mountain from '../../assets/images/mountain.jpg';
import map from '../../assets/images/map.jpg';
import './Banner.css';

const  Banner = () => {
  const [background , setBackground] = useState(0);
  const [text, setText] = useState('From ancient temples nestled in misty mountains to pristine beaches with crystal-clear waters, every journey brings new perspectives and unforgettable memories.');
  const [title, setTitle] = useState('Travel to the best places in the world');
  const [color, setColor] = useState<'dawn' | 'day' | 'dusk' | 'night'>('day');
  const image = [
    {
      id: 1,
      src: travelImage,
      alt: 'lack  image'
    }, 
    {
      id: 2,
      src: plane,
      alt: 'Plane  image'
    },
    {
      id: 3,
      src: mountain,
      alt: 'mountain  image'
    }, 
    {
      id: 4,
      src: map,
      alt: 'map image'
    }
  ]
  return (
    <>
    <div class="banner-container">
      <img className="banner-image" alt='travel image' src={travelImage} />
      <div className="banner-overlay">
      <div className="banner-content">
      <BsAirplane className="banner-icon" />
      <IoSunnyOutline className="banner-icon" />
      <h1 className="banner-title">Travel to the best places in the world</h1>
      <p className="banner-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, ligula ut scelerisque mollis, eros sapien tincidunt nisl, nec facilisis nunc tortor id justo.</p>
      </div>
      </div>
    </div>
</>    

  )
}


export default Banner