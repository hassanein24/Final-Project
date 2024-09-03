import axios from 'axios';
import { createContext } from 'react';

// Create the CartContext
export const CartContext = createContext();

const CartContextProvider = (props) => {
  // Extract token from localStorage for headers
  const headers = {
    token: localStorage.getItem('userToken'),
  };

  // Function to add a product to the cart
  function addToCart(productId) {
    return axios
      .post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { productId },
        { headers }
      )
      .then((response) => response.data)
      .catch((err) => {
        console.error('Error adding to cart:', err);
        throw err; // Re-throw to be handled by the caller
      });
  }

  // Function for online payment
  function onlinePayment(orderId, shippingAddress) {
    // Construct the URL using the provided orderId and redirect URL
    const baseUrl = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${orderId}`;
    const redirectUrl = encodeURIComponent('http://localhost:5173');
    const url = `${baseUrl}?url=${redirectUrl}`;

    return axios
      .post(
        url,
        { shippingAddress },
        { headers }
      )
      .then((response) => response.data)
      .catch((err) => {
        console.error('Error in onlinePayment:', err);
        throw err; // Re-throw to be handled by the caller
      });
  }

  // Function to update product quantity in the cart
  function updateProduct(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        { headers }
      )
      .then((response) => response.data)
      .catch((err) => {
        console.error('Error updating product:', err);
        throw err; // Re-throw to be handled by the caller
      });
  }

  // Function to delete an item from the cart
  function deleteItem(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
      .then((response) => response.data)
      .catch((err) => {
        console.error('Error deleting item:', err);
        throw err; // Re-throw to be handled by the caller
      });
  }

  // Function to get the logged-in user's cart
  async function getLogged() {
    try {
      const response = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { headers }
      );
      return response.data;
    } catch (err) {
      console.error('Error fetching cart data:', err);
      throw err; // Re-throw to be handled by the caller
    }
  }

  // Provide context values to the component tree
  return (
    <CartContext.Provider
      value={{ addToCart, getLogged, updateProduct, deleteItem, onlinePayment }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
