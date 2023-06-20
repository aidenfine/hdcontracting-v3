import * as React from 'react';
import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Card, Menu, MenuItem, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const columns = [
  {
    field: 'edit',
    headerName: '',
    width: 80,
    sortable: false,
    renderCell: (params) => {
      const navigateToDetails = () => {
        // Handle navigation to customer details based on params.row._id
        console.log('Navigate to details:', params.row._id);
      };

      return (
        <IconButton onClick={navigateToDetails}>
          <EditIcon />
        </IconButton>
      );
    },
  },
  { field: 'name', headerName: 'Full name', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'notes', headerName: 'Notes', width: 350 },
];

const CustomersTable = ({ data }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // eslint-disable-next-line no-unused-vars
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleCellContextMenu = (params, event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedRow(params.row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Card sx={{ width: '80%', height: 'auto' }}>
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row._id}
          onCellContextMenu={handleCellContextMenu}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20, 25, 30, 35]}
          disableSelectionOnClick
          disableColumnMenu
          checkboxSelection={false}
          sx={{
            outline: 'none',
          }}
        />
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          {/* Add menu items for the right-click menu */}
          <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
          <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
        </Menu>
      </Card>
    </Grid>
  );
};

export default CustomersTable;
