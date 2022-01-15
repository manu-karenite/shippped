import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoutes = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  return user && user.token ? children : <Navigate to="/login" replace />;
};

export default UserRoutes;
