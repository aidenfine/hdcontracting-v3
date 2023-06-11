import * as React from 'react';
import { useParams } from 'react-router-dom';
import SyncLoader from 'react-spinners/SyncLoader';
import getCustomerById from 'api/getCustomerById';

export function CustomerDetails() {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [customer, setCustomer] = React.useState(null);

  React.useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const data = await getCustomerById(id);
        setCustomer(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customer details:', error);
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [id]);

  if (loading) {
    return <SyncLoader color="#e42525" />;
  }

  if (!customer) {
    return <div>Customer not found.</div>;
  }

  return (
    <div>
      <h1>Customer Details</h1>
      <p>Customer ID: {customer._id}</p>
      <p>Name: {customer.name}</p>
      <p>Email: {customer.email}</p>
      <p>Notes: {customer.notes}</p>
      {/* Display the rest of the customer details */}
    </div>
  );
}
