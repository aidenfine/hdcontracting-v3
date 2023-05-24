import React from "react";
import { Navigate } from "react-router-dom";
import isAuth from "state/isAuth";
import JobsTable from "components/jobsTable/JobsTable";
import { Button, Card, CardContent } from "@mui/material";
import { card } from "./styles";

// IMPORT STYLES
function addNewJobBtn(){
  window.location.href='/jobs/newJob';
}

export const Jobs = () => {


  if(!isAuth()){
    return <Navigate to="/" replace />
  }
  return(
    <Card sx={card}>
      <CardContent>
        <Button variant="outlined" onClick={addNewJobBtn}>Add New</Button>
        <JobsTable />
      </CardContent>
    </Card>
    
      
    

  )
};
