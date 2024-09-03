import React, { useEffect, useState } from "react";
import style from "./CategorySlider.module.css";
import axios from "axios";
import Slider from "react-slick";
export default function CategorySlider() {
  const [categories, setCategory] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  function getCategory() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((response) => setCategory(response.data.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="my-5 py-4">
      <h2 className="text-2xl font-bold mb-2 ">
        Shop popular categories 
      </h2>
      {" "}
      <Slider {...settings}>
        {categories.map((category =>(
          <div className="h-[250px]" key={category._id}>
            <img src={category.image} alt={category.name} className="w-full h-full "></img>
            <h2>{category.name}</h2>
          </div>
        )))}
      </Slider>
    </div>
  );
}
