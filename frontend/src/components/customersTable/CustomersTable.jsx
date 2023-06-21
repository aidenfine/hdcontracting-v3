import React from 'react';
import {
  Grid,
  Card,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  TablePagination,
  Fade,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { customTableCell, customTableFooter, customTableHead, customTableRow } from './style';
import { Tooltip } from 'components/tooltip/Tooltip';
const columns = [
  { field: 'name', headerName: 'Full name', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'notes', headerName: 'Notes', width: 350 },
];

const MAX_CHAR_LIMIT = 50;

const truncateText = (text, maxLen) => {
  if (text.length > maxLen) {
    return text.slice(0, maxLen) + '...';
  }
  return text;
};

const CustomersTable = ({ data }) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = data.slice(startIndex, endIndex);

  const handleDetailsClick = (id) => {
    navigate(`/customers/details/${id}`);
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Card sx={{ width: '80%', height: 'auto', marginTop: '25px' }}>
        <TableContainer>
          <Table>
            <TableHead sx={customTableHead}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell sx={customTableCell} key={column.field}>
                    {column.headerName}
                  </TableCell>
                ))}
                <TableCell sx={customTableCell}></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {displayedData.map((row) => (
                <TableRow key={row._id} sx={customTableRow}>
                  {columns.map((column) => (
                    <TableCell key={column.field} sx={customTableCell}>
                      {truncateText(row[column.field], MAX_CHAR_LIMIT)}
                    </TableCell>
                  ))}
                  <TableCell sx={customTableCell}>
                    <Tooltip
                      title="Edit Customer"
                      placement="left"
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 250 }}
                    >
                      <IconButton onClick={() => handleDetailsClick(row._id)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={customTableFooter}
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Grid>
  );
};

export default CustomersTable;
