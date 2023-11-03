import { Home, Login, Register, Dashboard, Coba } from "../pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  PrivateRouteAdmin,
  PrivateRoutePasien,
  PrivateRouteDokter,
  PublicRoute,
} from "./ProtectedRoutes";

function Index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRouteAdmin />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/coba" element={<Coba />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Index;
