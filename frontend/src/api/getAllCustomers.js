const getAllCustomers = async () => {
  const API_URL = process.env.REACT_APP_BASE_URL;

  const res = await fetch(`${API_URL}/api/customers/getCustomers`, {
    method: 'GET',
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
  return await res.json();
};

export default getAllCustomers;
