import React, { useContext } from "react";
import style from "./ProductItem.module.css";
import { CartContext } from "../../../Context/CartContext/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProductItem({ product }) {
  const { addToCart } = useContext(CartContext);

  async function addProduct(id) {
    try {
      let { data } = await addToCart(id);
      console.log(data);
      toast.success('Product added successfully to your cart', {
        position: "top-right"
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add product to your cart', {
        position: "top-right"
      });
    }
  }

  return (
    <div className="inner product relative w-full md:w-1/3 lg:w-1/6">
      <Link to={`productdetails/${product.id}`}>
        <div className="mx-2">
          <img src={product.imageCover} alt={product.name} />
          <p className="mt-2 text-green-600">{product.category.name}</p>
          <h6 className="font-bold my-3">
            {product.title.split(" ").slice(3).join(" ")}
          </h6>
          <div className="flex flex-wrap justify-between">
            <p>{product.price} EGP</p>
            <div className="text-slate-500">
              <i className="fa-solid fa-star text-yellow-400"></i>
              <span>{product.ratingsAverage}</span>
            </div>
          </div>
        </div>
      </Link>

      <div>
        <button
          onClick={() => addProduct(product.id)}
          className="bg-green-500 px-2 btn rounded text-white absolute top-2"
        >
          +
        </button>
      </div>
    </div>
  );
}
