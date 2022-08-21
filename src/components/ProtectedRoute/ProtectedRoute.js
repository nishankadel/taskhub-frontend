import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ userToken }) => {
  if (userToken === null) {
    toast.error("You are not authorized to access this page.");
    return <Navigate to={"/auth/login"} />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute;
