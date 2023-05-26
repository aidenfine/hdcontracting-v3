import { Button, Card, CardContent } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
import isAuth from "state/isAuth";
import { card } from "./style";
import CustomersTable from "components/customersTable/CustomersTable";

function addNewCustomerBtn(){
    window.location.href="/customers/addNewCustomer";
}

export const Customers = () => {
  if(!isAuth()){
    return <Navigate to="/" replace />
  }
  return(
    <Card sx={card}>
        <CardContent>
            <Button variant="outlined" onClick={addNewCustomerBtn}>Add Customer</Button>
            <CustomersTable />
        </CardContent>
    </Card>
  );
};
