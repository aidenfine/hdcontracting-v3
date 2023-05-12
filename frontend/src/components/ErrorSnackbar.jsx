import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function ErrorSnackbar({ showSnackbar, handleSnackbarClose, message} ) {
    return (
        <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        >
          <Alert
          elevation={6}
          variant="filled"
          severity="error"
          onClose={handleSnackbarClose}
          >
            {message}
          </Alert>
        </Snackbar>

    )
  };



