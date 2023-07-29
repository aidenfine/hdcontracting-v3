// api/customer.js

const API_URL = process.env.REACT_APP_BASE_URL;

export const addCustomer = async (customerData, token) => {
  try {
    const response = await fetch(`${API_URL}/api/customers/addCustomer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(customerData),
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

export const addSubCustomer = async (customerId, subCustomerData) => {
  try {
    const response = await fetch(`${API_URL}/api/customers/${customerId}/addSubCustomer`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(subCustomerData),
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
