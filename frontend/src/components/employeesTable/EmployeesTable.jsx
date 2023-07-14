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
import { customTableCell, customTableFooter, customTableHead, customTableRow } from './style';
import { Tooltip } from 'components/tooltip/tooltip';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import CheckIcon from '@mui/icons-material/Check';
import CustomDialog from 'components/dialog/CustomDialog';
import { dialogText } from './config';
import VerifyDialog from 'components/dialog/confirmVerifyDialog/VerifyDialog';
import { verifyUserText } from 'components/dialog/confirmVerifyDialog/config';
import RoleChangeDialog from 'components/dialog/roleChangeDialog/RoleChangeDialog';

const columns = [
  { field: 'name', headerName: 'Full name', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'role', headerName: 'Role', width: 250 },
  { field: 'isVerifed', headerName: 'Verified', width: 250 },
];

const EmployeesTable = ({ data }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState('');
  const [openVerifyDialog, setOpenVerifyDialog] = React.useState(false);

  const [openRolePopup, setOpenRolePopup] = React.useState(false);

  const handleClickOpen = (id) => {
    setOpenDialog(true);
    setSelectedUserId(id);
  };

  const handleVerifyDialogOpen = (id) => {
    setOpenVerifyDialog(true);
    setSelectedUserId(id);
  };

  const handleVerifyDialogClose = () => {
    setOpenVerifyDialog(false);
    setSelectedUserId('');
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedUserId('');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRolePopupOpen = (id) => {
    setOpenRolePopup(true);
    setSelectedUserId(id);
  };
  const handleRolePopupClose = () => {
    setOpenRolePopup(false);
    setSelectedUserId('');
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = data.slice(startIndex, endIndex);

  const handleDeleteClick = (id) => {
    handleClickOpen(id);
  };

  const handleVerifyClick = (id) => {
    handleVerifyDialogOpen(id);
  };

  const handleRoleClick = (id) => {
    handleRolePopupOpen(id);
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
                      {column.field === 'isVerifed'
                        ? row.isVerifed
                          ? 'Yes'
                          : 'No'
                        : row[column.field]}
                    </TableCell>
                  ))}
                  <TableCell sx={customTableCell}>
                    <Tooltip
                      title="Edit Customer"
                      placement="left"
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 250 }}
                    >
                      <IconButton onClick={() => handleDeleteClick(row._id)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell sx={customTableCell}>
                    {!row.isVerifed ? (
                      <Tooltip
                        title="Verify User"
                        placement="left"
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 250 }}
                      >
                        <IconButton onClick={() => handleVerifyClick(row._id)}>
                          <CheckIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <TableCell sx={customTableCell}>
                        <Tooltip
                          title="Update Role"
                          placement="left"
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 250 }}
                        >
                          <IconButton onClick={() => handleRoleClick(row._id)}>
                            <AddModeratorIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    )}
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
      <CustomDialog
        title={'Delete User'}
        text={dialogText}
        open={openDialog}
        close={handleClose}
        id={selectedUserId}
      />
      <VerifyDialog
        title={'Verify User'}
        text={verifyUserText}
        open={openVerifyDialog}
        close={handleVerifyDialogClose}
        id={selectedUserId}
      />
      <RoleChangeDialog close={handleRolePopupClose} open={openRolePopup} id={selectedUserId} />
    </Grid>
  );
};

export default EmployeesTable;
