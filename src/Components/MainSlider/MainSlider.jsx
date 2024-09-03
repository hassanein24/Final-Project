import React from "react";
import Slider from "react-slick";
import img1 from "./../../assets/grocery-banner-2.jpeg";
import img2 from "./../../assets/grocery-banner.png";
import img3 from "./../../assets/banner-4.jpeg";
import img4 from "./../../assets/slider-2.jpeg";
import style from "./MainSlider.module.css";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Adjust this number to show more slides at once if needed
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-3/4">
        <Slider {...settings}>
          <div>
            <img src={img1} className="w-full h-[400px] object-cover" alt="Slider Image 1" />
          </div>
          <div>
            <img src={img2} className="w-full h-[400px] object-cover" alt="Slider Image 2" />
          </div>
        </Slider>
      </div>
      <div className="w-full md:w-1/4 flex flex-col space-y-2">
        <div>
          <img src={img3} alt="Thumbnail Image 1" className="w-full h-[200px] object-cover" />
        </div>
        <div>
          <img src={img4} alt="Thumbnail Image 2" className="w-full h-[200px] object-cover" />
        </div>
      </div>
    </div>
  );
}
