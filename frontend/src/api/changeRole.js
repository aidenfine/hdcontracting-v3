export const changeRole = async (userId, role) => {
  const API_URL = process.env.REACT_APP_BASE_URL;
  const response = await fetch(`${API_URL}/api/user/changeRole/${userId}/${role}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const responseData = await response.json();
  if (response.ok) {
    return responseData;
  } else {
    throw new Error(`Error: ${responseData.error}`);
  }
};
