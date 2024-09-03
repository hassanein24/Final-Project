import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { userContext } from "../../../Context/UserContext";

export default function ProtectedRoute({ children }) {
  const { userToken } = useContext(userContext);

  if (userToken) {
    return children; // Render protected content
  } else {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }
}
