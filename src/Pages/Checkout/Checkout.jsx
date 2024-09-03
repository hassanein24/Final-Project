import React, { useContext, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../../Context/CartContext/CartContext';

export default function Checkout() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { onlinePayment, getLogged } = useContext(CartContext);

  const [orderId, setOrderId] = useState(null); // State to store the order ID

  useEffect(() => {
    const fetchOrderId = async () => {
      try {
        const cart = await getLogged();
        console.log("Cart data:", cart); // Debugging log
        if (cart && cart.data && cart.data._id) {
          setOrderId(cart.data._id); // Assuming the order ID is stored in cart.data._id
        } else {
          console.error('Order ID not found in cart');
          setError('Order ID not found. Please try again later.');
        }
      } catch (error) {
        console.error('Error fetching cart or order ID:', error);
        setError('Failed to retrieve order ID. Please try again later.');
      }
    };

    fetchOrderId();
  }, [getLogged]);

  const handlePayment = async (values) => {
    if (!orderId) {
      setError('Order ID is missing');
      return;
    }

    setIsLoading(true);
    try {
      const response = await onlinePayment(orderId, values);
      console.log("Payment response:", response); // Debugging log

      if (response && response.session && response.session.url) {
        window.location.href = response.session.url; // Redirect to the session URL
      } else {
        setError('Invalid payment response');
        return;
      }
      
    } catch (error) {
      console.error('Payment error:', error);
      setError(error.response?.data?.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    details: Yup.string().required('Details is required'),
    city: Yup.string().required('City is required'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^01[0-25][0-9]{8}$/, 'Invalid phone number format'),
  });

  const formik = useFormik({
    initialValues: {
      details: '',
      city: '',
      phone: '',
    },
    validationSchema: validationSchema,
    onSubmit: handlePayment,
  });

  return (
    <div className="container px-3">
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <div className="my-3 mx-auto w-3/4">
        <h1>Checkout Now:</h1>
        <form className="my-3" onSubmit={formik.handleSubmit}>
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="relative my-4">
            <input
              type="text"
              id="details"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              name="details"
              placeholder=" "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.details}
            />
            <label
              htmlFor="details"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Details
            </label>
            {formik.errors.details && formik.touched.details && (
              <span className="text-red-500 mt-3">{formik.errors.details}</span>
            )}
          </div>

          <div className="relative my-4">
            <input
              type="text"
              id="city"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              name="city"
              placeholder=" "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
            <label
              htmlFor="city"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              City
            </label>
            {formik.errors.city && formik.touched.city && (
              <span className="text-red-500 mt-3">{formik.errors.city}</span>
            )}
          </div>

          <div className="relative my-4">
            <input
              type="tel"
              id="phone"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              name="phone"
              placeholder=" "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            <label
              htmlFor="phone"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Phone
            </label>
            {formik.errors.phone && formik.touched.phone && (
              <span className="text-red-500 mt-3">{formik.errors.phone}</span>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="text-gray-500 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
            >
              {isLoading ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
