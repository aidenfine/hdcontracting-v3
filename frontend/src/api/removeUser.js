export const removeUser = async (userId, token) => {
  const API_URL = process.env.REACT_APP_BASE_URL;
  const response = await fetch(`${API_URL}/api/user/remove/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });
  const responseData = await response.json();
  if (response.ok) {
    return responseData;
  } else {
    throw new Error(`Error: ${responseData.error}`);
  }
};
