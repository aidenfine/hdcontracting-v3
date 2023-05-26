import React from "react";
import { Navigate } from "react-router-dom";
import isAuth from "state/isAuth";

export const CustomerDetails = () => {
  if(!isAuth()){
    return <Navigate to="/" replace />
  }
  return <div>Customer Details</div>;
};
