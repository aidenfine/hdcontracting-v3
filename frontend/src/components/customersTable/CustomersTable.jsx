import * as React from 'react';
import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Card, Menu, MenuItem, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

const columns = [
  { field: 'edit', headerName: '', width: 80, sortable: false },
  { field: 'name', headerName: 'Full name', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'notes', headerName: 'Notes', width: 350 },
];

const CustomersTable = ({ data }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const navigate = useNavigate();

  const handleCellContextMenu = (params, event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedRow(params.row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const navigateToDetails = (id) => {
    navigate(`/customers/details/${id}`);
  };

  const updatedColumns = columns.map((column) => {
    if (column.field === 'edit') {
      return {
        ...column,
        renderCell: (params) => (
          <IconButton onClick={() => navigateToDetails(params.row._id)}>
            <EditIcon />
          </IconButton>
        ),
      };
    }
    return column;
  });

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Card sx={{ width: '80%', height: 'auto' }}>
        <DataGrid
          rows={data}
          columns={updatedColumns}
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
