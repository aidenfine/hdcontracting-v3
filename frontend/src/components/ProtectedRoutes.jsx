import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {

  const isAuth = localStorage.getItem("isLoggedIn")
  return(
    isAuth !== 'true' ? <Navigate to="/" /> : <Outlet />
  )
};

export default ProtectedRoutes;
