///api/customers/updateCustomer/:id"
export const updateCustomer = async (customerId, updatedCustomerData, token) => {
  try {
    console.log(typeof customerId);
    const API_URL = process.env.REACT_APP_BASE_URL;
    const response = await fetch(`${API_URL}/api/customers/updateCustomer/${customerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedCustomerData),
    });

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
