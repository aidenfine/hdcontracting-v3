import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
import { verifyUser } from 'api/verifyUser';
import SuccessSnackbar from 'components/SuccessSnackbar';

export default function VerifyDialog({ title, open, close, text, id }) {
  const [showSnackbar, setShowSnackbar] = React.useState(false);

  const handleConfirm = async () => {
    console.log(`Verify User ${id}`);
    setShowSnackbar(true);
    await verifyUser(id);
    close();
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
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
      <SuccessSnackbar
        handleSnackbarClose={handleSnackbarClose}
        showSnackbar={showSnackbar}
        message={'User has been verified they can now login '}
      />
    </div>
  );
}
