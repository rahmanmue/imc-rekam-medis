import { Home, Login, Register, Dashboard, Coba } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Routes from "./routes";

function App() {
  // return <Routes />;
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/coba" element={<Coba />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
