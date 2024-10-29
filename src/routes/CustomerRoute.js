import React from "react";
import { Navigate } from "react-router-dom";

const CustomerRoute = ({ children }) => {
  const loggedInUser = JSON.parse(sessionStorage.getItem("account"));
  if (!loggedInUser || loggedInUser.role !== "customer") {
    return <Navigate to="/404" />;
  }
  return children;
};

export default CustomerRoute;