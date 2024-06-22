// ProtectedRoutes
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { authentication } = useAuth();

  return authentication ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
