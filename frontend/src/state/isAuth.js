const isAuth = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

export default isAuth;
