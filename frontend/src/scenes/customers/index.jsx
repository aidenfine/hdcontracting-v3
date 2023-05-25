import React from "react";
import { Navigate } from "react-router-dom";
import isAuth from "state/isAuth";


export const Customers = () => {
  if(!isAuth()){
    return <Navigate to="/" replace />
  }
  return <div>Customers</div>;
};
