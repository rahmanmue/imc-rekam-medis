import { useState } from "react";
import { logo } from "./../../assets/index";
import { BiPlusMedical, BiLogOut, BiSolidUser } from "react-icons/bi";
import { MdOutlineDashboard } from "react-icons/md";
import { FaFileMedical, FaUserInjured, FaUserCog } from "react-icons/fa";
import { Link } from "react-router-dom";

function LayoutBack({ children }) {
  const [active, setActive] = useState("dashboard");

  const handleActive = (submenu) => {
    const submenuActive = active == submenu ? "active" : " ";
    return submenuActive;
  };

  const logout = () => {
    localStorage.romove();
  };

  return (
    <div className="container-fluid overflow-hidden">
      <div className="row vh-100 overflow-auto">
        <div className="col-12 col-sm-3 col-xl-2 bg-primary-green d-flex sticky-top p-sm-0">
          <div className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start text-white">
            <a
              href="/"
              className="d-flex align-items-center py-sm-2 px-sm-2 mb-md-0 me-md-auto text-white"
            >
              <img
                src={logo}
                alt="logo"
                className="img-fluid py-sm-4 px-sm-2 d-sm-block d-none"
              />
              <BiPlusMedical className="fs-4 m-sm-3 d-sm-none d-inline icon" />{" "}
              <span className="fw-bold ms-1 d-sm-none d-inline">IMC</span>
            </a>
            <ul
              className="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 justify-content-center align-items-center align-items-sm-start w-100 mt-sm-5"
              id="menu"
            >
              <li
                className={`submenu ${handleActive("dashboard")}`}
                onClick={() => setActive("dashboard")}
              >
                <a href="#">
                  <MdOutlineDashboard className="fs-4 icon" />
                  <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                </a>
              </li>
              <li
                className={`submenu ${handleActive("antrian medis")}`}
                onClick={() => setActive("antrian medis")}
              >
                <a href="#submenu1">
                  <FaFileMedical className="fs-4 icon" />
                  <span className="ms-1 d-none d-sm-inline">Antrian Medis</span>
                </a>
              </li>
              <li
                className={`submenu ${handleActive("list akun")}`}
                onClick={() => setActive("list akun")}
              >
                <a href="#">
                  <BiSolidUser className="fs-4 icon " />
                  <span className="ms-1 d-none d-sm-inline">List Akun</span>
                </a>
              </li>
              <li
                className={`submenu ${handleActive("riwayat pasien")}`}
                onClick={() => setActive("riwayat pasien")}
              >
                <a href="#">
                  <FaUserInjured className="fs-4 icon" />
                  <span className="ms-1 d-none d-sm-inline">
                    Riwayat Pasien
                  </span>
                </a>
              </li>
              <li
                className={`submenu ${handleActive("akun saya")}`}
                onClick={() => setActive("akun saya")}
              >
                <a href="#">
                  <FaUserCog className="fs-4 icon" />
                  <span className="ms-1 d-none d-sm-inline">Akun Saya</span>
                </a>
              </li>
            </ul>
            <div className="submenu py-sm-4 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1">
              <Link
                to="/"
                onClick={logout}
                className="d-flex align-items-center text-white text-decoration-none "
              >
                <BiLogOut className="fs-4 icon" />
                <span className="d-none d-sm-inline mx-1">Keluar</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="col d-flex flex-column h-sm-100">
          <main className="row overflow-auto">
            <div className="col pt-4">
              <h4 className="fw-semibold text-capitalize font-primary text-dark-blue">
                {active}
              </h4>
              <hr />
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default LayoutBack;
