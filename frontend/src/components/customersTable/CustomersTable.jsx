import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import getAllCustomers from '../../api/getAllCustomers';
import { Card, Grid } from '@mui/material';

const columns = [
  { field: 'name', headerName: 'Full name', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'notes', headerName: 'Notes', width: 350},
  {
    field: 'subCustomers',
    headerName: 'Sub Customers',
    width: 150,
    valueGetter: (params) => {
      if(params.row.subCustomers.length === 0){
        return <span style={{fontWeight: 300}}>None</span>
      } else{
        return JSON.stringify(params.row.subCustomers[0])
      }
    }
  },
  {
    field: 'street',
    headerName: 'Street',
    width: 100,
    valueGetter: (params) => {
      if(!params.row.address.street){
        return ''
      } else{
        return params.row.address.street
      }
    }
  },
  {
    field: 'city',
    headerName: 'City',
    width: 120,
    valueGetter: (params) => {
      if(!params.row.address.city){
        return ''
      } else{
        return params.row.address.city
      }
    }
  },
];



export default function CustomersTable() {

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const fetchCustomers = async () => {
      try{
        const response = await getAllCustomers();
        const data = response.data
        setRows(data);
      } catch (error) {
        console.error("error", error)
      }
    };
    fetchCustomers();
  }, [])


  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        width: '600',
        height: '700',
            }}
     
     >
      <Card
      sx={{
        width: '80%',
        height: 'auto',
      }}
      >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 15, 20, 25, 30, 35]}
        checkboxSelection
      />
      </Card>
    </Grid>
  );
}