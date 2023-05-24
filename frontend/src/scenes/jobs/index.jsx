import React from "react";
import { Navigate } from "react-router-dom";
import isAuth from "state/isAuth";
import JobsTable from "components/jobsTable/JobsTable";
import { Card, CardContent } from "@mui/material";
import { card } from "./styles";

// IMPORT STYLES

export const Jobs = () => {

  if(!isAuth()){
    return <Navigate to="/" replace />
  }
  return(
    <Card sx={card}>
      <CardContent>
        <JobsTable />
      </CardContent>
    </Card>
    
      
    

  )
};
