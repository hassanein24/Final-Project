import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../../Context/UserContext";
import { Helmet } from "react-helmet";

export default function Login() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  const { setUserToken } = useContext(userContext);

  // Function to handle login
  function handleLogin(values) {
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((response) => {
        console.log("Login success:", response.data);
        if (response.data.message === "success") {
          setUserToken(response.data.token);
          localStorage.setItem("userToken", response.data.token);
          setIsLoading(false);
          navigate("/");
        } else {
          setError("Login failed: " + response.data.message);
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setIsLoading(false);
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("An unexpected error occurred");
        }
      });
  }

  // Validation schema for Formik
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[0-9a-z]{3,9}$/,
        "Password must be between 3 and 9 alphanumeric characters"
      ),
  });

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className={`${style.container} px-3`}>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="my-3 mx-auto w-3/4">
        <h1>Login Now:</h1>
        <form className="my-3" onSubmit={formik.handleSubmit}>
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="relative my-4">
            <input
              type="text"
              id="email"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              name="email"
              placeholder=" "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Email
            </label>
            {formik.errors.email && formik.touched.email && (
              <span className="text-red-500 mt-3">{formik.errors.email}</span>
            )}
          </div>

          <div className="relative my-4">
            <input
              type="password"
              id="password"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              name="password"
              placeholder=" "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Password
            </label>
            {formik.errors.password && formik.touched.password && (
              <span className="text-red-500 mt-3">
                {formik.errors.password}
              </span>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-8 py-4 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 text-right"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
