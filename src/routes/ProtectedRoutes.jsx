import { Navigate, Outlet } from "react-router-dom";
import { isRole } from "../utils";

const useAuth = () => {
  const role = localStorage.getItem("user_role") || "user";
  const id = localStorage.getItem("id") || "";
  const user = isRole(role);
  // console.log(user);
  if (id) {
    if (user === "admin" || user === "pasien" || user === "dokter") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const PrivateRouteAdmin = () => {
  const auth = useAuth();
  const role = localStorage.getItem("user_role") || "user";
  const user = isRole(role);
  return auth && user === "admin" ? <Outlet /> : <Navigate to="/login" />;
};

const PrivateRouteDokter = () => {
  const auth = useAuth();
  const role = localStorage.getItem("user_role") || "user";
  const user = isRole(role);
  return auth && user === "dokter" ? <Outlet /> : <Navigate to="/login" />;
};

const PrivateRoutePasien = () => {
  const auth = useAuth();
  const role = localStorage.getItem("user_role") || "user";
  const user = isRole(role);
  return auth && user === "pasien" ? <Outlet /> : <Navigate to="/login" />;
};

const PublicRoute = () => {
  const auth = useAuth();
  return auth ? <Navigate to="/coba" /> : <Outlet />;
};

export {
  PrivateRouteAdmin,
  PrivateRouteDokter,
  PrivateRoutePasien,
  PublicRoute,
};
