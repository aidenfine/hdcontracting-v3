const getUserData = () => {
  const API_URL = process.env.REACT_APP_BASE_URL;
  fetch(`${API_URL}/api/userData`, {
    method: 'POST',
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      token: window.localStorage.getItem('token'),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data.data;
    });
};
export default getUserData;
