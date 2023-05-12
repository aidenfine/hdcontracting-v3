import React from "react";
import { Navigate } from "react-router-dom";
import isAuth from "state/isAuth";


export const Calendar = () => {
  if(!isAuth()){
    return <Navigate to="/" replace />
  }
  return <div>Calendar</div>;
};
