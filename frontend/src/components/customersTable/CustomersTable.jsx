import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import getAllCustomers from '../../api/getAllCustomers';
import { Card, Grid, Menu, MenuItem, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

const columns = [
  {
    field: 'edit',
    headerName: '',
    width: 80,
    sortable: false,
    renderCell: (params) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const navigate = useNavigate();

      const handleEditClick = () => {
        navigate(`/customers/details/${params.row._id}`);
      };

      return (
        <IconButton onClick={handleEditClick}>
          <EditIcon />
        </IconButton>
      );
    },
  },
  { field: 'name', headerName: 'Full name', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'notes', headerName: 'Notes', width: 350 },
];

export default function CustomersTable() {
  const [rows, setRows] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [setSelectedRow] = React.useState(null);

  React.useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getAllCustomers();
        const data = response.data;
        setRows(data);
      } catch (error) {
        console.error('error', error);
      }
    };
    fetchCustomers();
  }, []);

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
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <Card
        sx={{
          width: '80%',
          height: 'auto',
        }}
      >
        <>
          <DataGrid
            rows={rows}
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
        </>
      </Card>
    </Grid>
  );
}
