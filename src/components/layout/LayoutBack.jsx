import { useState } from "react";
import { logo } from "./../../assets/index";
import { BiPlusMedical, BiLogOut, BiSolidUser } from "react-icons/bi";
import { MdOutlineDashboard } from "react-icons/md";
import { FaFileMedical, FaUserInjured, FaUserCog } from "react-icons/fa";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";

function ListMenu({ props }) {
  return (
    <li className="submenu">
      <Link to={props.to}>
        {props.icon}
        <span className="ms-1 d-none d-sm-inline">{props.menu}</span>
      </Link>
    </li>
  );
}

function LayoutBack({ children, user }) {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname.split("/")[1];
  const active = path.split("-").join(" ");

  // const [active, setActive] = useState("IMRAN MEDICAL CENTER");

  // const handleActive = (submenu) => {
  //   const submenuActive = active == submenu ? "active-link" : " ";
  //   return submenuActive;
  // };

  // const clickActive = (menu) => {
  //   setActive(menu);
  // };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const listMenuByUser = (user) => {
    let LISTMENU = [];
    if (user === "admin") {
      LISTMENU = [
        {
          menu: "Dashboard",
          to: "/dashboard",
          icon: <MdOutlineDashboard className="fs-4 icon" />,
        },
        {
          menu: "Antrian Medis",
          to: "antrian-medis",
          icon: <FaFileMedical className="fs-4 icon" />,
        },
        {
          menu: "Riwayat Pasien",
          to: "/riwayat-pasien",
          icon: <FaUserInjured className="fs-4 icon" />,
        },
        {
          menu: "List Akun",
          to: "/list-akun",
          icon: <BiSolidUser className="fs-4 icon " />,
        },
        {
          menu: "Akun Saya",
          to: "/akun-saya",
          icon: <FaUserCog className="fs-4 icon" />,
        },
      ];
    } else if (user === "dokter") {
      LISTMENU = [
        {
          menu: "Dashboard",
          to: "/dashboard",
          icon: <MdOutlineDashboard className="fs-4 icon" />,
        },
        {
          menu: "Antrian Medis",
          to: "antrian-medis",
          icon: <FaFileMedical className="fs-4 icon" />,
        },
        {
          menu: "Riwayat Pasien",
          to: "/riwayat-pasien",
          icon: <FaUserInjured className="fs-4 icon" />,
        },
        {
          menu: "Akun Saya",
          to: "/akun-saya",
          icon: <FaUserCog className="fs-4 icon" />,
        },
      ];
    } else if (user === "pasien") {
      LISTMENU = [
        {
          menu: "Dashboard",
          to: "/dashboard",
          icon: <MdOutlineDashboard className="fs-4 icon" />,
        },
        {
          menu: "Akun Saya",
          to: "/akun-saya",
          icon: <FaUserCog className="fs-4 icon" />,
        },
      ];
    }
    return LISTMENU;
  };

  return (
    <div className="container-fluid overflow-hidden">
      <div className="row overflow-auto nav-dashboard">
        <div className="col-12 col-sm-3 col-xl-2 bg-primary-green d-flex sticky-top p-sm-0 py-3">
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
              <BiPlusMedical className="fs-4 m-sm-3 d-sm-none d-inline icon" />
              <span className="fw-bold ms-1 d-sm-none d-inline">IMC</span>
            </a>
            <ul
              className="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 justify-content-center align-items-center align-items-sm-start w-100 mt-sm-5"
              id="menu"
            >
              {listMenuByUser(user).map((props, i) => (
                <ListMenu props={props} key={i} />
              ))}
            </ul>
            <div className="submenu py-sm-4 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1">
              <div
                className="d-flex align-items-center text-white text-decoration-none fw-bold font-primary pointer"
                onClick={handleLogout}
              >
                <BiLogOut className="fs-4 icon" />
                <span className="d-none d-sm-inline mx-1">Keluar</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col d-flex flex-column h-sm-100">
          <main className="row overflow-auto">
            <div className="col pt-4">
              <h2 className="ps-3 fw-bold text-capitalize font-primary text-dark-blue">
                {active ?? "IMRAN MEDICAL CENTER"}
              </h2>
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
