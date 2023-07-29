const getUserData = async (token) => {
  const API_URL = process.env.REACT_APP_BASE_URL;
  try {
    const response = await fetch(`${API_URL}/api/userData`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export default getUserData;
