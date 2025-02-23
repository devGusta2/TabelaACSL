import { Outlet, Navigate, BrowserRouter, Routes, Route} from "react-router-dom";

const ProtectedRoutes = () => {
  const user = localStorage.getItem("token");
  return user ? <Outlet /> : <Navigate to="/pages/Login" />;
};

export default ProtectedRoutes; 
