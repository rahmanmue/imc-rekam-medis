import { Navigate, Outlet } from "react-router-dom";
import { LayoutBack } from "../components";
import { isRole } from "../utils";

const ProtectedRoutes = () => {
  const user = isRole(localStorage.getItem("user_role"));
  return user === "admin" || user === "dokter" || user === "pasien" ? (
    <LayoutBack user={user}>
      <Outlet />
    </LayoutBack>
  ) : (
    <Navigate to="/login" />
  );
};

const ProtectedRoutesAdminDokter = () => {
  const user = isRole(localStorage.getItem("user_role"));
  return user === "admin" || user === "dokter" ? (
    <LayoutBack user={user}>
      <Outlet />
    </LayoutBack>
  ) : (
    <Navigate to="/login" />
  );
};

const ProtectedRoutesAdmin = () => {
  const user = isRole(localStorage.getItem("user_role"));
  return user === "admin" ? (
    <LayoutBack user={user}>
      <Outlet />
    </LayoutBack>
  ) : (
    <Navigate to="/login" />
  );
};

const ProtectedRoutesDokter = () => {
  const user = isRole(localStorage.getItem("user_role"));
  return user === "dokter" ? (
    <LayoutBack user={user}>
      <Outlet />
    </LayoutBack>
  ) : (
    <Navigate to="/login" />
  );
};

const PublicRoute = () => {
  const user = isRole(localStorage.getItem("user_role"));

  return user === "admin" || user === "dokter" || user === "pasien" ? (
    <LayoutBack user={user}>
      <Navigate to="/dashboard" replace />
    </LayoutBack>
  ) : (
    <Outlet />
  );
};

export {
  ProtectedRoutes,
  ProtectedRoutesAdminDokter,
  ProtectedRoutesAdmin,
  ProtectedRoutesDokter,
  PublicRoute,
};
