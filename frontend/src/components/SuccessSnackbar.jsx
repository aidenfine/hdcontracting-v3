import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SuccessSnackbar({ showSnackbar, handleSnackbarClose, message }) {
  return (
    <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
      <Alert elevation={6} variant="filled" severity="success" onClose={handleSnackbarClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}
