import {
  Home,
  Login,
  Register,
  Dashboard,
  Coba,
  ListAkun,
  RekamMedis,
  RiwayatPasien,
  AkunSaya,
  AntrianMedis,
  EditAkun,
  TambahRekamMedis,
  EditRekamMedis,
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ProtectedRoutes,
  ProtectedRoutesAdminDokter,
  ProtectedRoutesAdmin,
  PublicRoute,
} from "./routes/PrivateRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/coba" element={<Coba />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rekam-medis/:uuid" element={<RekamMedis />} />
          <Route path="/akun-saya" element={<AkunSaya />} />
        </Route>

        <Route element={<ProtectedRoutesAdmin />}>
          <Route path="/list-akun" element={<ListAkun />} />
          <Route path="/list-akun/edit/:id" element={<EditAkun />} />
        </Route>

        <Route element={<ProtectedRoutesAdminDokter />}>
          <Route path="/riwayat-pasien" element={<RiwayatPasien />} />
          <Route
            path="/rekam-medis/tambah/:nama/:uuid"
            element={<TambahRekamMedis />}
          />
          <Route
            path="/rekam-medis/edit/:nama/:id/:uuid"
            element={<EditRekamMedis />}
          />
          <Route path="/antrian-medis" element={<AntrianMedis />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
