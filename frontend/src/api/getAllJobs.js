const getAllJobs = async (token) => {
  const API_URL = process.env.REACT_APP_BASE_URL;

  const res = await fetch(`${API_URL}/api/jobs/getJobs`, {
    method: 'GET',
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export default getAllJobs;
