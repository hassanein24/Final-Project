import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../../Context/CartContext/CartContext";
import Loader from "../../Components/Loader/Loader";
import { Link } from "react-router-dom";

export default function Cart() {
  const { getLogged, updateProduct, deleteItem } = useContext(CartContext);
  const [allData, setAllData] = useState({ products: [], totalCartPrice: 0 });
  const [loading, setLoading] = useState(true); // Add loading state

  // Function to fetch and set cart data
  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await getLogged();
      console.log("Fetched data:", data);
      setAllData({
        products: data.products || [],
        totalCartPrice: data.totalCartPrice || 0,
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await deleteItem(id);
      await getData();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const updateCount = async (id, count) => {
    try {
      const { data } = await updateProduct(id, count);
      setAllData(data.data);
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  };

  // Handlers for decreasing and increasing quantity
  const handleDecrease = (id, count) => {
    if (count > 1) {
      updateCount(id, count - 1);
    }
  };

  const handleIncrease = (id, count) => {
    updateCount(id, count + 1);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="m-auto w-5/6">
      <h2 className="text-2xl text-center font-bold mt-5 mb-5 text-green-600">
        Shopping Cart:
      </h2>
      <h4 className="text-center text-xl mt-4">
        Total Price{" "}
        <span className="font-bold">${allData.totalCartPrice.toFixed(2)}</span>
      </h4>
      <div className="flex justify-end my-2">
        <Link className="bg-green-500 p-2 my  rounded " to={"/checkout"}>Checkout</Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {allData.products.length > 0 ? (
              allData.products.map((product) => (
                <tr
                  key={product._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product.product.title}
                      onError={() =>
                        console.log(
                          "Failed to load image:",
                          product.product.imageCover
                        )
                      }
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          handleDecrease(product.product.id, product.count)
                        }
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Decrease Quantity</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <input
                        type="number"
                        id={`product_${product._id}`}
                        className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={product.count}
                        readOnly
                      />
                      <button
                        onClick={() =>
                          handleIncrease(product.product.id, product.count)
                        }
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Increase Quantity</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    ${product.price * product.count}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteProduct(product.product.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No items in cart
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
