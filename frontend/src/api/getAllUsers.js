const getAllUsers = (token) => {
  const API_URL = process.env.REACT_APP_BASE_URL;

  return fetch(`${API_URL}/api/user/getUsers`, {
    method: 'GET',
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export default getAllUsers;
