import React from 'react';
import { Modal, Paper, Typography, Button, useTheme, Box, TextField, Grid, } from '@mui/material';
import { styled } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function CalendarModal({ open, onClose }) {


  const theme = useTheme();
  const [eventName, setEventName] = React.useState('');

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{
        position: 'absolute',
        width: '600px',
        height: '660px',
        left: '420px',
        top: '182px',
      }}
    >
     <Box>
        <Paper
      >
        <Typography variant="h6" component="h2">
          Add New Event
        </Typography>
        <Typography variant="body1" component="p">
          Modal content goes here.
        </Typography>
        <Grid container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
                <Item>
                <TextField
                    label="Event Name"
                    value={eventName}
                    onChange={(event)=>
                    setEventName(event.target.value)}
                />
                </Item>
                <Grid item xs={6}>

                </Grid>
            </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          marginTop={theme.spacing(3)}
        >
          Close
        </Button>
      </Paper>
     </Box>
    </Modal>
  );
}

export default CalendarModal;
