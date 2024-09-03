import React from 'react'
import style from './Home.module.css';
import MainSlider from '../../Components/MainSlider/MainSlider';
import CategorySlider from '../../Components/CategorySlider/CategorySlider';
import Products from '../../Components/Products/Products';
export default function Home() {
  return (
    <div className={`${style.container}`}>
      <MainSlider></MainSlider>
      <CategorySlider></CategorySlider>
      <Products></Products>
    </div>
  )
}
