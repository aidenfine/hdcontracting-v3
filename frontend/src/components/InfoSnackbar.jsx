import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function InfoSnackbar({ showSnackbar, handleSnackbarClose, message} ) {
    return (
        <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        >
          <Alert
          elevation={6}
          variant="filled"
          severity="info"
          onClose={handleSnackbarClose}
          >
            {message}
          </Alert>
        </Snackbar>

    )
  };



