import { Routes, Route, Outlet } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Dashboard } from "../pages/Dashboard";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return <h2>Carregando...</h2>;
  }

  return <Outlet />;
};

export const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};
