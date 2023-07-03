import FeatureError from 'components/errorPages/featureError/FeatureError';
import React from 'react';
import { Navigate } from 'react-router-dom';
import isAuth from 'state/isAuth';

const featureFlag = process.env.REACT_APP_EMPLOYEES_FEATURE_FLAG;

export const Employees = () => {
  if (!isAuth()) {
    return <Navigate to="/" replace />;
  }
  if (featureFlag === 'true') {
    return <FeatureError />;
  }
  return <div>Employees</div>;
};
