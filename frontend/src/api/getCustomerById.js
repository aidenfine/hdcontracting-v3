const getCustomerById = async (customerId) => {
  try {
    const API_URL = process.env.REACT_APP_BASE_URL;
  
    const response = await fetch(`${API_URL}/api/customers/id/${customerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    
    if (!response.ok) {
      throw new Error('Error fetching customer by ID');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching customer by ID');
  }
};

export default getCustomerById;
