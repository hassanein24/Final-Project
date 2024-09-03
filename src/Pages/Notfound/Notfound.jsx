import React from 'react';
import style from './Notfound.module.css';

// Import the image
import notFoundImage from './../../assets/error.svg';

export default function Notfound() {
  return (
    <div className={style.container}>
      
      <img src={notFoundImage} alt="Not Found" className={style.image} />
    </div>
  );
}
