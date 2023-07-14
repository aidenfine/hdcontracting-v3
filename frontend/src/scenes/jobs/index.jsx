import React from 'react';
import { Navigate } from 'react-router-dom';
import isAuth from 'state/isAuth';
import JobsTable from 'components/jobsTable/JobsTable';
import { Button, Card, CardContent } from '@mui/material';
import { card } from './styles';
import FeatureError from 'components/errorPages/featureError/FeatureError';

const featureFlag = process.env.REACT_APP_JOBS_FEATURE_FLAG;

// IMPORT STYLES
function addNewJobBtn() {
  window.location.href = '/jobs/newJob';
}

export const Jobs = () => {
  if (!isAuth()) {
    return <Navigate to="/" replace />;
  }
  if (featureFlag === 'true') {
    return <FeatureError />;
  }
  return (
    <Card sx={card}>
      <CardContent>
        <Button variant="outlined" onClick={addNewJobBtn}>
          Add New
        </Button>
        {/* !!! FIX THIS !!!*/}
        <JobsTable /> {/* THIS JOBS TABLE WILL PUSH SIGN OUT BUTTON OFF SCREEN */}
      </CardContent>
    </Card>
  );
};
