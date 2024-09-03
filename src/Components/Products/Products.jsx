import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";

export default function Products() {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true);

  function getProducts(page = 1) {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`)
      .then((response) => {
        if (response.data) {
          setData(response.data);
          setPageNum(page);
        } else {
          console.error("Unexpected response structure:", response);
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  function handlePageChange({ selected }) {
    const newPage = selected + 1;
    getProducts(newPage);
  }

  const renderProducts = () => {
    if (loading) {
      return <Loader />;
    }

    if (!data || !data.data || data.data.length === 0) {
      return <p className="text-center text-gray-500">No products available.</p>;
    }

    return (
      <div className="flex flex-wrap">
        {data.data.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Helmet>
        <title>Products</title>
      </Helmet>
      {renderProducts()}
      <div className="flex justify-center mt-6">
        <button
          className={`px-4 py-2 mx-2 border rounded-lg ${
            pageNum <= 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => handlePageChange({ selected: pageNum - 2 })}
          disabled={pageNum <= 1}
        >
          Previous
        </button>
        <button
          className={`px-4 py-2 mx-2 border rounded-lg ${
            data && data.data && data.data.length === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => handlePageChange({ selected: pageNum })}
          disabled={data && data.data && data.data.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}
