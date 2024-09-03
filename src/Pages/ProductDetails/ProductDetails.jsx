import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Loader from "../../Components/Loader/Loader";
import { Helmet } from "react-helmet";
import { CartContext } from "../../../Context/CartContext/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { addToCart , } = useContext(CartContext);

  async function addProduct(id) {
    let {data} = await addToCart(id);
    toast.success('Product added successfully to your cart', {
      position: "top-right"
    });
  }
  let { id } = useParams();

  // Function to fetch product details
  async function getDetails() {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setDetails(response.data.data);
    } catch (err) {
      setError("Failed to load product details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDetails();
  }, [id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay:true,
    autoplayspeed:2000
  };

  if (loading) {
    return <Loader></Loader>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={style.container}>
      <Helmet>
        <title>{details.title}</title>
      </Helmet>
      <div className="flex flex-wrap items-center mt-10">
        <div className="w-1/4">
          <Slider {...settings}>
            {details.images && details.images.map((image, index) => (
              <img key={index} src={image} className="w-full h-64 object-contain" alt={`Product Image ${index + 1}`} />
            ))}
          </Slider>
        </div>
        <div className="w-3/4 px-4">
          <div className="inner">
            <h1 className="text-3xl">{details.title}</h1>
            <small className="text-slate-500">{details.description}</small>
            <p>{details.category?.name}</p>
            <div className="flex justify-between">
              <p>{details.price}</p>
              <div>
                {details.ratingsAverage}
                <i className="fa-solid fa-star text-yellow-400"></i>
              </div>
            </div>
            <button onClick={()=>{addProduct(id)}} className="bg-green-500 w-full p-2 rounded mt-3 text-white">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
