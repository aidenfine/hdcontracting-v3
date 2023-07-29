export const getUserById = async (id, token) => {
  try {
    const API_URL = process.env.REACT_APP_BASE_URL;

    const response = await fetch(`${API_URL}/api/user/getUser/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching user by ID');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching user by ID');
  }
};
