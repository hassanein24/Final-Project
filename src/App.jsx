import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Pages/MainLayout/MainLayout";
import Cart from "./Pages/Cart/Cart";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Notfound from "./Pages/Notfound/Notfound";
import ProtectedRoute from "./Pages/ProtectedRoute/ProtectedRoute";
import UserContextProvider from "../Context/UserContext";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import { Offline } from "react-detect-offline";
import { QueryClient, QueryClientProvider } from "react-query";
import CartContextProvider from "../Context/CartContext/CartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./Pages/Checkout/Checkout";


function App() {
  const routers = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        
        {
          path: "register",
          element: (
            
              <Register />
            
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: <Login />, // No need to protect the login page
        },
        {
          path: "*",
          element: (
            <ProtectedRoute>
              <Notfound />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <CartContextProvider>
          <Offline>
            <div className="bg-red-200 absloute bottom-1 right-5 z-50 p-7 rounded w-1/4 fixed">
              Only shown offline(surprise!)
            </div>
          </Offline>
          <Toaster></Toaster>
          <RouterProvider router={routers} />
        </CartContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
