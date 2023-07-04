import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
import { removeUser } from 'api/removeUser';

export default function CustomDialog({ title, open, close, text, id }) {
  const handleConfirm = () => {
    removeUser(id);
    window.location.reload();
  };

  return (
    <div>
      <Dialog onClose={close} open={open}>
        <DialogTitle id="dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-text">{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
