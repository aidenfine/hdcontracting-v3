import React from 'react';
import { Modal, Paper, Typography, Button, useTheme } from '@mui/material';

function CalendarModal({ open, onClose }) {
  const theme = useTheme();

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        backgroundColor={theme.palette.background.paper}
        boxShadow={theme.shadows[5]}
        padding={theme.spacing(3)}
        outline="none"
        maxWidth="400"
      >
        <Typography variant="h6" component="h2" marginBottom={theme.spacing(2)}>
          Add New Event
        </Typography>
        <Typography variant="body1" component="p">
          Modal content goes here.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          marginTop={theme.spacing(3)}
        >
          Close
        </Button>
      </Paper>
    </Modal>
  );
}

export default CalendarModal;
