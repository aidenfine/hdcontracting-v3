export const updateSubCustomer = async (customerId, subCustomerData) => {
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
  