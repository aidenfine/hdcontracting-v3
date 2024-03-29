export const updateSubCustomer = async (customerId, subCustomerId, subCustomerData, token) => {
  const API_URL = process.env.REACT_APP_BASE_URL;
  try {
    const response = await fetch(
      `${API_URL}/api/customers/${customerId}/subCustomers/${subCustomerId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(subCustomerData),
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(`Error: ${responseData.error}`);
    }
  } catch (error) {
    throw error;
  }
};
