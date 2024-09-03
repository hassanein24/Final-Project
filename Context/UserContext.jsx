import React, { createContext, useState, useEffect } from "react";

// Create context
export const userContext = createContext();

// Define the provider component
export default function UserContextProvider(props) {
  // Initialize state from localStorage if available
  const [userToken, setUserToken] = useState(() => {
    return localStorage.getItem('userToken') || null;
  });

  // Update localStorage whenever userToken changes
  useEffect(() => {
    if (userToken) {
      localStorage.setItem('userToken', userToken);
    } else {
      localStorage.removeItem('userToken');
    }
  }, [userToken]);

  return (
    <userContext.Provider value={{ userToken, setUserToken }}>
      {props.children}
    </userContext.Provider>
  );
}
