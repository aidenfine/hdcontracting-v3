import FeatureError from 'components/errorPages/featureError/FeatureError';
import React from 'react';
import { Navigate } from 'react-router-dom';
import isAuth from 'state/isAuth';

const featureFlag = process.env.REACT_APP_INVOICES_FEATURE_FLAG;

export const Invoices = () => {
  if (!isAuth()) {
    return <Navigate to="/" replace />;
  }
  if (featureFlag === 'true') {
    return <FeatureError />;
  }
  return <div>Invoices</div>;
};
