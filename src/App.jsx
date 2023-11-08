// import {
//   Home,
//   Login,
//   Register,
//   Dashboard,
//   Coba,
//   AntrianMedis,
//   ListAkun,
//   RiwayatPasien,
//   RekamMedis,
//   AkunSaya,
//   EditAkun,
//   TambahRekamMedis,
// } from "./pages";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Routes from "./routes/Index";

function App() {
  return <Routes />;
  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route index element={<AkunSaya />} />
  //       <Route path="/home" element={<Home />} />
  //       <Route path="/list-akun" element={<ListAkun />} />
  //       <Route path="/riwayat-pasien" element={<RiwayatPasien />} />
  //       <Route path="/akun-saya" element={<AkunSaya />} />
  //       <Route path="/edit-akun" element={<EditAkun />} />
  //       <Route path="/tambah-rekam-medis" element={<TambahRekamMedis />} />
  //       <Route path="/rekam-medis" element={<RekamMedis />} />
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/register" element={<Register />} />
  //       <Route path="/dashboard" element={<Dashboard />} />
  //       <Route path="/coba" element={<Coba />} />
  //       <Route path="/antrian-medis" element={<AntrianMedis />} />
  //     </Routes>
  //   </BrowserRouter>
  // );
}

export default App;
