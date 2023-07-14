import { useState, useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { cardItemContainer, customStack, title } from './styles';
import getAllCustomers from 'api/getAllCustomers';
import Loading from 'components/loadingPage/Loading';

export const CustomersMobile = () => {
  const token = localStorage.getItem('token');
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const maxNotesLength = 25; // Maximum number of characters for notes

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getAllCustomers(token);
        const data = response.data;
        setCustomerData(data);
        setLoading(false);
      } catch (error) {
        console.error('error', error);
      }
    };
    fetchCustomers();
  }, [token]);

  const truncateNotes = (notes) => {
    if (notes.length > maxNotesLength) {
      return notes.substring(0, maxNotesLength) + '...';
    }
    return notes;
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#F9FAFB',
    ...theme.typography.body2,
    height: '125px',
    width: '250px',
    display: 'flex',
    color: theme.palette.text.secondary,
    borderRadius: '13.5px',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'flex-start',
  }));

  if (loading) {
    return <Loading />;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={4} sx={customStack}>
        {customerData.map((customer, index) => (
          <Item key={index}>
            <Box sx={title}>{customer.name}</Box>
            <Box sx={cardItemContainer}>
              <div>Name: {customer.name}</div>
              <div>Email: {customer.email}</div>
              <div>Notes: {truncateNotes(customer.notes)}</div>
            </Box>
          </Item>
        ))}
      </Stack>
    </Box>
  );
};
