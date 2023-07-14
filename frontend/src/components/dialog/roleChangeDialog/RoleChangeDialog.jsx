import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';
import { changeRole } from 'api/changeRole';
import { useState } from 'react';

export default function RoleChangeDialog({ close, open, id }) {
  const token = localStorage.getItem('token');
  const roles = [
    { label: 'Admin', id: 'admin' },
    { label: 'User', id: 'user' },
    { label: 'Owner', id: 'owner' },
  ];

  const [selectedRole, setSelectedRole] = useState(roles[0]);

  const handleConfirm = () => {
    if (selectedRole) {
      const role = selectedRole.id;
      changeRole(id, role, token);
      close(); // Close the dialog
      window.location.reload();
    }
  };

  const handleRoleChange = (event, value) => {
    setSelectedRole(value);
  };

  return (
    <div>
      <Dialog open={open} onClose={close}>
        <DialogTitle sx={{ marginBottom: '25px' }}>Change Role</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: '20px' }}>
            Change user's role to...
          </DialogContentText>
          <FormControl fullWidth>
            <Autocomplete
              id="role-dropdown"
              options={roles}
              value={selectedRole}
              onChange={handleRoleChange}
              isOptionEqualToValue={(option, value) => option.label === value.label}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Roles" />}
            />
            {!selectedRole && (
              <Typography color="error" variant="caption">
                Please select a role.
              </Typography>
            )}
            <Button variant="outlined" onClick={close}>
              Close
            </Button>
            <Button variant="outlined" onClick={handleConfirm}>
              Update Role
            </Button>
          </FormControl>
        </DialogContent>
      </Dialog>
    </div>
  );
}
